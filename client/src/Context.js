import React, { Component } from "react";
import Cookies from 'js-cookie';

import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {
  /**
   * Storing states and handling cookies
   */
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');

    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    };
  }

  render() {
    /**
   * Storing value from helper functions, data, and authenticated user to be passed down into context to be accessed from
   * components in apps.
   */
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
/**
 * ----/Sign In/----*
 * 
 * @param {*} username being passed into it to be referenced from database
 * @param {*} password being passed into it to be referenced from database
 * @returns user being returned after being authenticated that user exists and setting the cookie
 */
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    const plainText = password;
    if (user !== null) {
      user.password = plainText;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  };

/**
 *  * ----/Sign Out/----*
 * Authenticated User being set back to null to trigger to a signed out state troughout app
 * Cookie removed.
 */
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
