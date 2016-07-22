import $ from 'jquery'

const url = 'http://localhost:8000';

export default {
  fetch() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url:      url + '/api/todos',
        method:   'GET',
        dataType: 'json',
        success:  resolve,
        error:    reject
      });
    });
  },

  create(todo) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url:      url + '/api/todos',
        method:   'POST',
        dataType: 'json',
        data:     todo,
        success:  resolve,
        error:    reject
      });
    });
  },

  update(todo) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url:      url + '/api/todos/' + todo.id,
        method:   'PUT',
        dataType: 'json',
        data:     todo,
        success:  resolve,
        error:    reject
      });
    });
  },

  remove(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url:      url + '/api/todos/' + id,
        method:   'DELETE',
        dataType: 'json',
        success:  resolve,
        error:    reject
      });
    });
  }
};
