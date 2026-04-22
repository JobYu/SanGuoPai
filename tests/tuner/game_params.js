/**
 * SanGuoPai Game Parameters — Tunable Configuration
 *
 * This file defines all game parameters that the tuner can adjust.
 * It exports:
 *   - defaultParams: 当前游戏的默认参数
 *   - paramSchema:   每个参数的类型、范围、约束
 *   - applyParams:   将参数应用到游戏数据（生成修改后的 enemies/generals）
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Parameter Schema
// ---------------------------------------------------------------------------

/**
 * Each parameter has:
 *   - type: 'number' | 'integer' | 'enum' | 'boolean'
 *   - min/max: for numeric types
 *   - step: for numeric types (granularity)
 *   - default: default value
 *   - description: what this parameter controls
 *   - impact: 'high' | 'medium' | 'low' — how much it affects balance
 */
export const paramSchema = {
  // === Enemy Parameters (per-difficulty scaling) ===
  'enemy.money_target_multiplier': {
    type: 'number', min: 0.5, max: 2.0, step: 0.05, default: 0.95,
    description: '全局金钱目标乘数，影响所有关卡的目标金额',
    impact: 'high',
  },
  'enemy.max_rounds_offset': {
    type: 'integer', min: -2, max: 3, step: 1, default: 0,
    description: '全局回合数偏移，+1 表示所有敌人多给1回合',
    impact: 'high',
  },
  'enemy.ai_stand_threshold_base': {
    type: 'integer', min: 14, max: 20, step: 1, default: 17,
    description: '敌人AI停牌阈值基准值',
    impact: 'medium',
  },
  'enemy.ai_variance': {
    type: 'number', min: 0, max: 3, step: 0.5, default: 1.0,
    description: '不同敌人AI阈值的差异幅度（0=所有敌人一样）',
    impact: 'low',
  },

  // === Difficulty Modifiers ===
  'difficulty.easy_multiplier': {
    type: 'number', min: 0.5, max: 1.0, step: 0.05, default: 0.65,
    description: '入门难度的金钱目标乘数',
    impact: 'medium',
  },
  'difficulty.hard_multiplier': {
    type: 'number', min: 1.0, max: 2.0, step: 0.05, default: 1.5,
    description: '困难难度的金钱目标乘数',
    impact: 'medium',
  },
  'difficulty.hard_ai_penalty': {
    type: 'number', min: 0, max: 1.0, step: 0.05, default: 0.40,
    description: '困难难度下敌人额外惩罚概率',
    impact: 'medium',
  },

  // === Player Resources ===
  'player.hands_per_battle': {
    type: 'integer', min: 1, max: 8, step: 1, default: 4,
    description: '每局战斗可用的出牌次数',
    impact: 'high',
  },
  'player.discards_per_battle': {
    type: 'integer', min: 1, max: 8, step: 1, default: 4,
    description: '每局战斗可用的弃牌次数',
    impact: 'medium',
  },
  'player.hit_limit': {
    type: 'integer', min: 1, max: 5, step: 1, default: 3,
    description: '每回合最多要牌次数',
    impact: 'medium',
  },
  'player.initial_generals': {
    type: 'integer', min: 1, max: 5, step: 1, default: 3,
    description: '游戏开始时拥有的武将数量',
    impact: 'high',
  },
  'player.max_slots': {
    type: 'integer', min: 3, max: 8, step: 1, default: 5,
    description: '最大武将槽位数',
    impact: 'medium',
  },

  // === General Skills ===
  'skills.additive_base_multiplier': {
    type: 'number', min: 0.5, max: 3.0, step: 0.1, default: 1.3,
    description: '加法技能数值全局乘数',
    impact: 'medium',
  },
  'skills.multiplier_base_multiplier': {
    type: 'number', min: 0.8, max: 3.0, step: 0.05, default: 1.5,
    description: '乘法技能数值全局乘数',
    impact: 'high',
  },

  // === Blackjack Rules ===
  'rules.blackjack_payout': {
    type: 'number', min: 1.0, max: 5.0, step: 0.25, default: 2.5,
    description: 'Blackjack 额外赔付倍率',
    impact: 'medium',
  },
  'rules.double_down_allowed': {
    type: 'boolean', default: true,
    description: '是否允许双倍下注',
    impact: 'medium',
  },
  'rules.split_allowed': {
    type: 'boolean', default: true,
    description: '是否允许分牌',
    impact: 'medium',
  },
};

// ---------------------------------------------------------------------------
// Default Parameters
// ---------------------------------------------------------------------------

export const defaultParams = Object.fromEntries(
  Object.entries(paramSchema).map(([key, schema]) => [key, schema.default])
);

// ---------------------------------------------------------------------------
// Apply Parameters to Game Data
// ---------------------------------------------------------------------------

/**
 * Generate modified game data based on tuner parameters.
 * Returns deep-copied, modified versions of enemies/generals data.
 */
export function applyParams(params) {
  // Load original data
  const generalsData = JSON.parse(readFileSync(join(__dirname, '../../public/data/generals.json'), 'utf-8'));
  const enemiesData  = JSON.parse(readFileSync(join(__dirname, '../../public/data/enemies.json'),  'utf-8'));

  // Deep clone
  const generals = JSON.parse(JSON.stringify(generalsData.generals));
  const enemies  = JSON.parse(JSON.stringify(enemiesData.enemies));

  // --- Apply enemy modifications ---
  enemies.forEach((enemy, index) => {
    // Scale money target
    enemy.money_target = Math.round(
      enemy.money_target * params['enemy.money_target_multiplier']
    );

    // Adjust max rounds
    enemy.max_rounds = Math.max(1, enemy.max_rounds + params['enemy.max_rounds_offset']);

    // Adjust AI threshold with variance
    const baseThreshold = params['enemy.ai_stand_threshold_base'];
    const variance = params['enemy.ai_variance'];
    // Use enemy index to create deterministic variation
    const offset = ((index * 7) % (variance * 2 + 1)) - variance;
    enemy.ai_stand_threshold = Math.max(14, Math.min(20, Math.round(baseThreshold + offset)));
  });

  // --- Apply general skill modifications ---
  generals.forEach(g => {
    if (g.skill_effects) {
      g.skill_effects.forEach(effect => {
        if (effect.type === '加法' && effect.value) {
          effect.value = Math.round(effect.value * params['skills.additive_base_multiplier']);
        }
        if (effect.type === '乘法' && effect.value) {
          effect.value = Math.round(effect.value * params['skills.multiplier_base_multiplier'] * 100) / 100;
        }
      });
    }
  });

  return {
    generals,
    enemies,
    // Global rules
    rules: {
      handsPerBattle: params['player.hands_per_battle'],
      discardsPerBattle: params['player.discards_per_battle'],
      hitLimit: params['player.hit_limit'],
      initialGenerals: params['player.initial_generals'],
      maxSlots: params['player.max_slots'],
      easyMultiplier: params['difficulty.easy_multiplier'],
      hardMultiplier: params['difficulty.hard_multiplier'],
      hardAIPenalty: params['difficulty.hard_ai_penalty'],
      blackjackPayout: params['rules.blackjack_payout'],
      doubleDownAllowed: params['rules.double_down_allowed'],
      splitAllowed: params['rules.split_allowed'],
    },
  };
}

// ---------------------------------------------------------------------------
// Parameter Validation
// ---------------------------------------------------------------------------

export function validateParams(params) {
  const errors = [];
  for (const [key, schema] of Object.entries(paramSchema)) {
    const value = params[key];
    if (value === undefined) {
      errors.push(`${key}: missing`);
      continue;
    }
    if (schema.type === 'number' || schema.type === 'integer') {
      if (value < schema.min || value > schema.max) {
        errors.push(`${key}: ${value} out of range [${schema.min}, ${schema.max}]`);
      }
      if (schema.type === 'integer' && !Number.isInteger(value)) {
        errors.push(`${key}: ${value} is not an integer`);
      }
    }
    if (schema.type === 'boolean' && typeof value !== 'boolean') {
      errors.push(`${key}: must be boolean`);
    }
  }
  return errors;
}

// ---------------------------------------------------------------------------
// Random Parameter Generation
// ---------------------------------------------------------------------------

export function randomizeParams(baseParams = defaultParams, magnitude = 0.3) {
  const result = { ...baseParams };
  for (const [key, schema] of Object.entries(paramSchema)) {
    if (schema.type === 'number') {
      const range = schema.max - schema.min;
      const delta = (Math.random() * 2 - 1) * range * magnitude;
      let value = result[key] + delta;
      value = Math.max(schema.min, Math.min(schema.max, value));
      value = Math.round(value / schema.step) * schema.step;
      result[key] = value;
    }
    if (schema.type === 'integer') {
      const range = schema.max - schema.min;
      const delta = Math.round((Math.random() * 2 - 1) * range * magnitude);
      let value = result[key] + delta;
      value = Math.max(schema.min, Math.min(schema.max, value));
      result[key] = value;
    }
    // boolean: 10% chance to flip
    if (schema.type === 'boolean' && Math.random() < 0.1) {
      result[key] = !result[key];
    }
  }
  return result;
}
