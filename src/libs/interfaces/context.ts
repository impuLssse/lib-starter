import { Context } from "telegraf";
import { Message, Update } from "telegraf/typings/core/types/typegram";
import { Scenes as TelegrafScenes } from 'telegraf';

export enum SceneContract {}

export interface IContext extends Context {
  scene: ISceneContextScene;
  session: SessionData;
  message: Update.New &
    Update.NonChannel &
    Message & { text?: string } & Message.CommonMessage;
}

export interface ISceneContextScene {
  enter: (sceneId: SceneContract) => Promise<unknown>;
}

export interface SessionData extends TelegrafScenes.SceneSession<SceneSession> {
  user: {
    id: number;
    telegramId: string;
  };
}

interface SceneSession extends TelegrafScenes.SceneSessionData {}
