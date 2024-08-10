import { Injectable, Scope, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private users: any[];

  constructor() {
    const usersPath = path.join(__dirname, 'users.json');
    this.users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }

  /**
   * Retrieves a list of users with a random user added to the end of the list.
   * The added user has a unique id, name, email, and about section.
   * The function also capitalizes the name and about section of each user.
   *
   * @return {any[]} An array of user objects.
   */
  getUsers(): any[] {
    Logger.log('Get Users');

    // copy users to new array and add random number to the response to avoid 304 http code
    var users_copy = this.users.slice();
    const random = Math.floor(Math.random() * 100000);
    users_copy.push({
      id: '66895b8c5bc91291c2f388b7',
      name: 'user' + random,
      email: 'user' + random + '@kindaloo.com',
      about: 'about',
    });

    return users_copy.map((user) => {
      Logger.log('Processing user: ' + user.name);
      // Inefficient string operations
      user.name = this.capitalizeInefficient(user.name);
      user.about = this.capitalizeInefficient(user.about);
      return user;
    });
  }

  /**
   * Capitalizes the first character of each word in a given string.
   *
   * @param {string} str - The input string to be capitalized.
   * @return {string} The capitalized string.
   */
  private capitalizeInefficient(str: string): string {
    // Split the string into words
    const words = str.split(' ');

    // Process each word
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let capitalizedWord = '';

      // Capitalize the first character (inefficient way)
      for (let j = 0; j < word.length; j++) {
        if (j === 0) {
          capitalizedWord += word[j].toUpperCase();
        } else {
          capitalizedWord += word[j].toLowerCase();
        }
      }

      // Replace the word in the array
      words[i] = capitalizedWord;
    }

    return words.join(' ');
  }
}
