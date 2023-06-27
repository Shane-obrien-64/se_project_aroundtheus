export default class UserInfo {
  constructor(nameSelector, descriptionSelector, profileImageSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._profileImage = document.querySelector(profileImageSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }
  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setUserProfileImage(link) {
    this._profileImage.src = link;
  }
}
