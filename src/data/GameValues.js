// Various values used when modding the game content.
// https://paladinsoath.fandom.com/wiki/Mods_values
export const GameValues = {
  Element: {
    element_physical: {
      value: 'element_physical',
      name: 'Physical',
    },
    element_fire: {
      value: 'element_fire',
      name: 'Fire',
    },
    element_frost: {
      value: 'element_frost',
      name: 'Frost/Ice',
    },
    element_chaos: {
      value: 'element_chaos',
      name: 'Chaos',
    },
  },
  AttackType: {
    Basic: {
      value: 0,
      name: 'Basic',
    },
    Range: {
      value: 1,
      name: 'Range',
    },
    Siege: {
      value: 2,
      name: 'Siege',
    },
  },
  AttackModifier: {
    None: {
      value: 0,
      name: 'None',
    },
    Poison: {
      value: 1,
      name: 'Poison',
    },
    Paralyze: {
      value: 2,
      name: 'Paralyze',
    },
    Assassin: {
      value: 3,
      name: 'Assassin',
    },
    Brutal: {
      value: 4,
      name: 'Brutal',
    },
    Swift: {
      value: 5,
      name: 'Swift',
    },
    Cumbersome: {
      value: 6,
      name: 'Cumbersome',
    },
  },
  TurnPhase: {
    Initializing: {
      value: -1,
      name: 'Initializing',
    },
    TurnStart: {
      value: 0,
      name: 'Turn Start',
    },
    Movement: {
      value: 1,
      name: 'Movement',
    },
    InteractionLocation: {
      value: 20,
      name: 'Interaction> Location',
    },
    InteractionBattle: {
      value: 21,
      name: 'Interaction> Battle',
    },
    TurnEnd: {
      value: 3,
      name: 'Turn End',
    },
  },
  BattlePhase: {
    None: {
      value: 0,
      name: 'None',
    },
    BeforeBattle: {
      value: 1,
      name: 'Before Battle',
    },
    Range: {
      value: 2,
      name: 'Range',
    },
    Block: {
      value: 3,
      name: 'Block',
    },
    Attack: {
      value: 4,
      name: 'Attack',
    },
    AfterBattle: {
      value: 5,
      name: 'After Battle',
    },
  },
  CardType: {
    Wound: {
      value: 1,
      name: 'Wound',
    },
    Action: {
      value: 2,
      name: 'Action',
    },
    Relic: {
      value: 3,
      name: 'Relic',
    },
    Spell: {
      value: 4,
      name: 'Spell',
    },
  },
  PlayerCardLocation: {
    Hand: {
      value: 0,
      name: 'Hand',
    },
    DiscardPile: {
      value: 1,
      name: 'Discard Pile',
    },
    DrawPile: {
      value: 2,
      name: 'Draw Pile',
    },
  },
  CardEffectSlot: {
    None: {
      value: 0,
      name: 'None',
    },
    Basic: {
      value: 1,
      name: 'Basic',
    },
    Advanced: {
      value: 2,
      name: 'Advanced',
    },
  },
  ManaForm: {
    Token: {
      value: 0,
      name: 'Token',
    },
    Source: {
      value: 1,
      name: 'Source',
    },
    Crystal: {
      value: 2,
      name: 'Crystal',
    },
  },
  ManaColorType: {
    Basic: {
      value: 0,
      name: 'Basic',
    },
    Special: {
      value: 1,
      name: 'Special',
    },
  },
  FollowerType: {
    Basic: {
      value: 0,
      name: 'Basic',
    },
    Elite: {
      value: 1,
      name: 'Elite',
    },
  },
  Immunity: {
    Arcane: {
      value: 1,
      name: 'Arcane',
    },
  },
  Fortification: {
    NeverFortified: {
      value: 1,
      name: 'Never Fortified',
    },
    NotFortified: {
      value: 2,
      name: 'Not Fortified',
    },
    Fortified: {
      value: 3,
      name: 'Fortified',
    },
    DoubleFortified: {
      value: 4,
      name: 'Double Fortified',
    },
  },
  FortificationModification: {
    NeverFortified: {
      value: -3,
      name: 'Never Fortified',
    },
    LoseAllFortification: {
      value: -2,
      name: 'Lose All Fortification',
    },
    LoseFortification: {
      value: -1,
      name: 'Lose Fortification',
    },
    GainFortification: {
      value: 0,
      name: 'Gain Fortification',
    },
    AlwaysFortified: {
      value: 1,
      name: 'Always Fortified',
    },
  },
  CardCostType: {
    Discard: {
      value: 0,
      name: 'Discard',
    },
    Throw: {
      value: 1,
      name: 'Throw',
    },
  },
  BlessingRefreshCondition: {
    Always: {
      value: 0,
      name: 'Always',
    },
    EndOfRound: {
      value: 1,
      name: 'End Of Round',
    },
  },
  ScenarioDifficulty: {
    Easy: {
      value: 0,
      name: 'Easy',
    },
    Medium: {
      value: 1,
      name: 'Medium',
    },
    Hard: {
      value: 2,
      name: 'Hard',
    },
    Expert: {
      value: 3,
      name: 'Expert',
    },
  },
  ScenarioDuration: {
    Short: {
      value: 0,
      name: 'Short',
    },
    Medium: {
      value: 1,
      name: 'Medium',
    },
    Long: {
      value: 2,
      name: 'Long',
    },
    VeryLong: {
      value: 3,
      name: 'Very Long',
    },
  },
  MapSectionType: {
    Starter: {
      value: 0,
      name: 'Starter',
    },
    Regular: {
      value: 1,
      name: 'Regular',
    },
    Core: {
      value: 2,
      name: 'Core',
    },
  },
  MapShape: {
    map_shape_circular: {
      value: 'map_shape_circular',
      name: 'Circular',
    },
    map_shape_cone: {
      value: 'map_shape_cone',
      name: 'Conical',
    },
    map_shape_corridor_tight: {
      value: 'map_shape_corridor_tight',
      name: 'Corridor (Tight)',
    },
    map_shape_corridor: {
      value: 'map_shape_corridor',
      name: 'Corridor',
    },
  },
  ManaColor: {
    mana_black: {
      value: 'mana_black',
      name: 'Black',
    },
    mana_gold: {
      value: 'mana_gold',
      name: 'Gold',
    },
    mana_red: {
      value: 'mana_red',
      name: 'Red',
    },
    mana_blue: {
      value: 'mana_blue',
      name: 'Blue',
    },
    mana_white: {
      value: 'mana_white',
      name: 'White',
    },
    mana_green: {
      value: 'mana_green',
      name: 'Green',
    },
  },
  TimeOfDay: {
    timeofday_day: {
      value: 'timeofday_day',
      name: 'Day',
    },
    timeofday_night: {
      value: 'timeofday_night',
      name: 'Night',
    },
  },
  Reward: {
    character_level_up_reward_card_and_skill: {
      value: 'character_level_up_reward_card_and_skill',
      name: 'Pick a card from the Market and Draw a Blessing',
    },
    character_level_up_reward_unitslot_and_armor: {
      value: 'character_level_up_reward_unitslot_and_armor',
      name: '+1 Follower Slot and +1 Armor',
    },
    character_level_up_reward_unitslot_and_hand_size: {
      value: 'character_level_up_reward_unitslot_and_hand_size',
      name: '+1 Follower Slot and +1 Hand Size',
    },
    reward_xp_1: {
      value: 'reward_xp_1',
      name: '+1 XP',
    },
    reward_draw_card_1: {
      value: 'reward_draw_card_1',
      name: 'Draw 1 Card',
    },
    reward_draw_card_2: {
      value: 'reward_draw_card_2',
      name: 'Draw 2 Cards',
    },
    reward_artifact_into_deck: {
      value: 'reward_artifact_into_deck',
      name: 'Draw 2 Keep 1 Relic into Deck',
    },
    reward_artifact_into_hand: {
      value: 'reward_artifact_into_hand',
      name: 'Draw 2 keep 1 Relic into Hand',
    },
    reward_offer_advanced_action: {
      value: 'reward_offer_advanced_action',
      name: 'Select 1 Action card form Market into Deck',
    },
    reward_offer_advanced_action_2: {
      value: 'reward_offer_advanced_action_2',
      name: 'Select 2 Action cards form Market into Deck',
    },
    reward_offer_advanced_action_3: {
      value: 'reward_offer_advanced_action_3',
      name: 'Select 3 Action cards form Market into Deck',
    },
    reward_offer_spell: {
      value: 'reward_offer_spell',
      name: 'Select 1 Spell from Market into Deck',
    },
    reward_offer_spell_2: {
      value: 'reward_offer_spell_2',
      name: 'Select 2 Spells from Market into Deck',
    },
    reward_offer_spell_3: {
      value: 'reward_offer_spell_3',
      name: 'Select 3 Spells from Market into Deck',
    },
    reward_offer_unit: {
      value: 'reward_offer_unit',
      name: 'Select 1 Follower from the Market',
    },
    reward_offer_unit_2: {
      value: 'reward_offer_unit_2',
      name: 'Select 2 Followers from the Market',
    },
    reward_offer_unit_3: {
      value: 'reward_offer_unit_3',
      name: 'Select 3 Followers from the Market',
    },
    reward_unit_slot: {
      value: 'reward_unit_slot',
      name: '+1 Follower Slot',
    },
    reward_unit_slot_2: {
      value: 'reward_unit_slot_2',
      name: '+2 Follower Slots',
    },
    reward_unit_slot_3: {
      value: 'reward_unit_slot_3',
      name: '+3 Follower Slots',
    },
    reward_mana_crystal_pick: {
      value: 'reward_mana_crystal_pick',
      name: 'Gain a Mana Crystal of their choice',
    },
    reward_mana_crystal_random: {
      value: 'reward_mana_crystal_random',
      name: 'Roll Mana: RGBW=gain crystal; Black=1XP; Gold=pick color',
    },
    reward_mana_crystal_blue: {
      value: 'reward_mana_crystal_blue',
      name: 'Gain Blue Mana Crystal',
    },
    reward_mana_crystal_green: {
      value: 'reward_mana_crystal_green',
      name: 'Gain Green Mana Crystal',
    },
    reward_mana_crystal_red: {
      value: 'reward_mana_crystal_red',
      name: 'Gain Red Mana Crystal',
    },
    reward_mana_crystal_white: {
      value: 'reward_mana_crystal_white',
      name: 'Gain White Mana Crystal',
    },
    reward_mana_token_pick: {
      value: 'reward_mana_token_pick',
      name: 'Gain Mana essence of their choice',
    },
    reward_mana_token_black: {
      value: 'reward_mana_token_black',
      name: 'Gain Black Mana Essence',
    },
    reward_mana_token_gold: {
      value: 'reward_mana_token_gold',
      name: 'Gain Gold Mana Essence',
    },
    reward_recover_used_crystals: {
      value: 'reward_recover_used_crystals',
      name: 'Recover all crystals used this turn',
    },
    reward_player_armor_1: {
      value: 'reward_player_armor_1',
      name: '+1 Armor',
    },
    reward_player_armor_2: {
      value: 'reward_player_armor_2',
      name: '+2 Armor',
    },
    reward_player_armor_3: {
      value: 'reward_player_armor_3',
      name: '+3 Armor',
    },
    reward_player_hand_size_1: {
      value: 'reward_player_hand_size_1',
      name: '+1 Hand Size',
    },
    reward_player_hand_size_2: {
      value: 'reward_player_hand_size_2',
      name: '+2 Hand Size',
    },
    reward_player_hand_size_3: {
      value: 'reward_player_hand_size_3',
      name: '+3 Hand Size',
    },
    reward_reputation_inc_1: {
      value: 'reward_reputation_inc_1',
      name: '+1 Reputation',
    },
    reward_reputation_inc_2: {
      value: 'reward_reputation_inc_2',
      name: '+2 Reputation',
    },
    reward_reputation_inc_3: {
      value: 'reward_reputation_inc_3',
      name: '+3 Reputation',
    },
    reward_reputation_dec_1: {
      value: 'reward_reputation_dec_1',
      name: '-1 Reputation',
    },
    reward_reputation_dec_2: {
      value: 'reward_reputation_dec_2',
      name: '-2 Reputation',
    },
    reward_reputation_dec_3: {
      value: 'reward_reputation_dec_3',
      name: '-3 Reputation',
    },
    reward_skill: {
      value: 'reward_skill',
      name: 'Draw 2 Keep 1 Blessing',
    },
    reward_skill_2: {
      value: 'reward_skill_2',
      name: 'Draw 3 Keep 2 Blessings',
    },
    reward_skill_3: {
      value: 'reward_skill_3',
      name: 'Draw 4 Keep 3 Blessings',
    },
    reward_skill_offer: {
      value: 'reward_skill_offer',
      name: 'Select 1 Blessing',
    },
    reward_wound_throw_all_received_this_turn: {
      value: 'reward_wound_throw_all_received_this_turn',
      name: 'Throw all Wounds received this turn',
    },
    reward_wound_throw_discard: {
      value: 'reward_wound_throw_discard',
      name: 'Throw 1 wound from Discard pile',
    },
    reward_wound_throw_hand: {
      value: 'reward_wound_throw_hand',
      name: 'Throw 1 Wound from Hand',
    },
    reward_wound_throw: {
      value: 'reward_wound_throw',
      name: 'Throw 1 Wound from Hand or Discard Pile',
    },
    reward_wound_throw_2: {
      value: 'reward_wound_throw_2',
      name: 'Throw 2 Wounds from Hand or Discard Pile',
    },
    reward_wound_throw_3: {
      value: 'reward_wound_throw_3',
      name: 'Throw 3 Wounds from Hand or Discard Pile',
    },
  },
  RewardComboType: {
    combo_and: {
      value: 0,
      name: 'AND',
    },
    combo_or: {
      value: 1,
      name: 'OR',
    },
  },
  EnemyType: {
    enemy_type_vermling: {
      value: 'enemy_type_vermling',
      name: 'Vermling',
    },
    enemy_type_guardian: {
      value: 'enemy_type_guardian',
      name: 'Guardian',
    },
    enemy_type_arcanum: {
      value: 'enemy_type_arcanum',
      name: 'Arcanum',
    },
    enemy_type_abomination: {
      value: 'enemy_type_abomination',
      name: 'Abomination',
    },
    enemy_type_abyssal: {
      value: 'enemy_type_abyssal',
      name: 'Abyssal',
    },
    enemy_type_ancient: {
      value: 'enemy_type_ancient',
      name: 'Ancient',
    },
  },
  Oath: {
    oath_vengeance: {
      value: 'oath_vengeance',
      name: 'Vengeance',
    },
    oath_devotion: {
      value: 'oath_devotion',
      name: 'Devotion',
    },
    oath_conquest: {
      value: 'oath_conquest',
      name: 'Conquest',
    },
    oath_guidance: {
      value: 'oath_guidance',
      name: 'Guidance',
    },
    oath_abundance: {
      value: 'oath_abundance',
      name: 'Abundance',
    },
    oath_piety: {
      value: 'oath_piety',
      name: 'Piety',
    },
    oath_way_of_the_drow: {
      value: 'oath_way_of_the_drow',
      name: 'Way of the Drow',
    },
    oath_way_of_the_sun: {
      value: 'oath_way_of_the_sun',
      name: 'Way of the Sun',
    },
  },
};

// Returns the value data or null if not found
export const FindEnumByValue = (valuesDict, valueToFind) => {
  const foundValue = Object.values(valuesDict).find((val) => val.value === valueToFind);
  return foundValue === undefined ? null : foundValue;
};
