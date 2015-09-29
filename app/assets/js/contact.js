module.exports = class Contact {
  constructor() {
    this.pageHeader = document.querySelector('.page-header');
    this.formSection = document.querySelector('.contact-form')
    this.form = this.formSection.querySelector('form');
    this.errors = this.formSection.querySelector('#errors');
    this.errorsList = this.formSection.querySelector('.errors-list');
    this.success = this.formSection.querySelector('#success');
    this.fail = this.formSection.querySelector('#fail');
    return this.bindForm();
  }

  bindForm() {
    return this.form.addEventListener('submit', (e) => this.onSubmit(e), false);
  }

  onSubmit(e) {
    e.preventDefault();
    this.errors.style.display = 'none';
    this.success.style.display = 'none';
    this.fail.style.display = 'none';
    const errorFields = this.form.querySelectorAll('.has-error');
    for (let errorField of errorFields) {
      errorField.classList.remove('has-error');
    }

    return this.sendAjax();
  }

  sendAjax() {
    const request = new XMLHttpRequest();
    request.open('POST', this.form.action, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.timeout = 3000;
    request.onerror = () => this.onFail();
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        if (data.form_ok) {
          this.onSuccess(data);
          this.always();
        } else {
          this.onError(data);
          this.always();
        }
      } else {
        this.onFail();
        this.always();
      }
    };

    const data = this.getFormData();
    return request.send(data);
  }

  getFormData() {
    const elements = this.form.elements;
    const dataString = [];
    for (let element of elements) {
      if (element.name && !element.disabled) {
        let encoded = [element.name, element.value].map(encodeURIComponent);
        dataString.push(encoded.join('='));
      }
    }
    return dataString.join('&');
  }

  onError(data) {
    const errors = data.errors;
    const errorFields = data.errors.fields;
    const errorMessages = data.errors.messages;
    const errorList = document.createElement('ul');
    errorMessages.forEach((message) => {
      let errorListItem = document.createElement('li');
      errorListItem.innerHTML = message;
      errorList.appendChild(errorListItem);
    });
    errorFields.forEach((errorField) => {
      let field = this.form.querySelector(`#${errorField}`);
      field.classList.add('has-error');
    });
    this.errors.style.display = 'block';
    return this.errorsList.innerHTML = errorList.innerHTML;
  }

  onSuccess(data) {
    this.success.style.display = 'block';
    return this.form.reset();
  }

  always() {
    const scrollPos =
      this.formSection.getBoundingClientRect().top
      + document.body.scrollTop
      - this.pageHeader.offsetHeight
      - 24;

    return window.scrollTo(0, scrollPos);
  }

  onFail() {
    return this.fail.style.display = 'block';
  }
}
