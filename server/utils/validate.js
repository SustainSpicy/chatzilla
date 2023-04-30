class Validation {
  constructor(value) {
    this.value = value || "";
  }

  notEmptyStr() {
    if (/^$/.test(this.value)) {
      return false;
    }
    return this;
  }
  trim() {
    this.value = this.value.trim();
    return this;
  }
  isString() {
    if (typeof this.value !== "string") {
      return false;
    }
    return this;
  }
  notEmptyArr() {
    if (arr.length <= 0) {
      return false;
    }
    return this.value;
  }
}

export default function (params) {
  Validation.prototype.notEmptyStr = function () {
    if (/^$/.test(this.value)) {
      return false;
    }
    return this;
  };
  return new Validation(params);
}
