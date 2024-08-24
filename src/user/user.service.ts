import { Injectable, Scope, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserService {
  private users: any[];
  private _logger: Logger;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    const usersPath = path.join(__dirname, 'users.json');
    this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    this._logger = logger;
  }

  /**
   * Retrieves a list of users with a random user added to the end of the list.
   * The added user has a unique id, name, email, and about section.
   * The function also capitalizes the name and about section of each user.
   *
   * @return {any[]} An array of user objects.
   */
  getUsers(): any[] {
    this._logger.info('Get Users');

    return this.users.map((user) => {
      user.name = this.capitalizeOptimized(user.name);
      user.about = this.capitalizeOptimized(user.about);
      return user;
    });
  }

  /**
   * Capitalizes the first character of each word in a given string.
   *
   * @param {string} str - The input string to be capitalized.
   * @return {string} The capitalized string.
   */
  private capitalizeOptimized(str: string): string {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
