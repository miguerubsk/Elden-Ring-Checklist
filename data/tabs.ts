import {
  AchievementsList,
  BossesList,
  GracesList,
  CollectablesList,
  QuestsList,
  UpgradesList,
  ListType,
  WeaponsList,
  SpellsList,
} from "./lists";

export enum TabNames {
  Quests,
  Achievements,
  Graces,
  Bosses,
  Upgrades,
  Collectables,
  Weapons,
  Spells,
}

export interface TabData {
  id: number;
  name: string;
  enum: TabNames;
  listData: ListType[];
}

export const MainTabDataArray: TabData[] = [
  {
    id: 1,
    name: "Misiones",
    enum: TabNames.Quests,
    listData: QuestsList,
  },
  {
    id: 2,
    name: "Logros",
    enum: TabNames.Achievements,
    listData: AchievementsList,
  },
  {
    id: 3,
    name: "Gracias",
    enum: TabNames.Graces,
    listData: GracesList,
  },
  {
    id: 4,
    name: "Jefes",
    enum: TabNames.Bosses,
    listData: BossesList,
  },
  {
    id: 5,
    name: "Mejoras",
    enum: TabNames.Upgrades,
    listData: UpgradesList,
  },
];

export const PersonalTabDataArray: TabData[] = [
  {
    id: 6,
    name: "Armas",
    enum: TabNames.Weapons,
    listData: WeaponsList,
  },
  {
    id: 7,
    name: "Hechizos",
    enum: TabNames.Spells,
    listData: SpellsList,
  },
  {
    id: 8,
    name: "Coleccionables",
    enum: TabNames.Collectables,
    listData: CollectablesList,
  },
];
