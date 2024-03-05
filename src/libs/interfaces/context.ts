import { Context } from "telegraf";

export enum SceneContract {}

export interface IContext extends Context {
  scene: ISceneContextScene;
}

export interface ISceneContextScene {
  enter: (sceneId: SceneContract) => Promise<unknown>;
}

export interface SessionData {
  user: {
    id: number;
    telegramId: string;
  };
}
