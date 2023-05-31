export default class UserInfo {
  constructor({ userName, userDescription }) {
    this._name = userName;
    this._description = userDescription;
  }
  getUserInfo() {
    return {
      name: this._name,
      description: this._description,
    };
  }
  setUserInfo() {
    this.getUserInfo;
  }
}
