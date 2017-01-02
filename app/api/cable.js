'use strict'

import ActionCable from 'actioncable';
import { GameTypes } from 'utils/enums.js';
import Auth from 'utils/auth.js';
export default class Cable {
  constructor(gameType, gameId, actions) {
    this.cable = ActionCable.createConsumer(`${process.env.API_URL}/cable?token=${Auth.getToken()}`);
    this.gameType = gameType;
    this.gameId = gameId;
    this.actions = actions;
    this.onDisconnected = this.actions.disconnected;
    this.actions.disconnected = this.handleDisconnected;
    this.subscribe();
  }
  handleDisconnected() {
    console.error('Disconnected from cable!');
    if (this.onDisconnected) {
      this.onDisconnected();
    }
  }
  subscribe() {
    console.log('Connecting to cable');
    this.channel = this.cable.subscriptions.create(
      {
        channel: GameTypes[this.gameType].channel,
        token: Auth.getToken(),
        game_id: this.gameId
      },
      this.actions
    )
  }
}
