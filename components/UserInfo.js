export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = nameSelector;
    this._description = descriptionSelector;
  }
  getUserInfo() {
    return {
      name: this._name,
      description: this._description,
    };
  }
  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
