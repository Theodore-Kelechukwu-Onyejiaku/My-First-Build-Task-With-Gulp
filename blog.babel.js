'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var getBlogPost = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var titlePromise, loremPromise, _ref2, _ref3, titleResponse, loremResponse;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            titlePromise = getRequest(api + '/generate-title');
            loremPromise = getRequest(api + '/generate-lorem');
            _context.prev = 2;
            _context.next = 5;
            return Promise.all([titlePromise, loremPromise]);

          case 5:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            titleResponse = _ref3[0];
            loremResponse = _ref3[1];

            document.querySelector('main').appendChild(buildPostElement(titleResponse.title, loremResponse.lorem));
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](2);

            document.querySelector('main').appendChild(buildPostElement('An error occurred!', _context.t0));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 12]]);
  }));

  return function getBlogPost() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var api = 'https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets';
var loadButton = document.getElementById('load-button');

function getRequest(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status !== 200) {
          reject(JSON.parse(request.response));
        }
        resolve(JSON.parse(request.response));
      }
    };
    request.send();
  });
}

loadButton.addEventListener('click', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          getBlogPost();

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));

function buildPostElement(title, content) {
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var cardTitle = document.createElement('h2');
  var cardContent = document.createElement('p');

  card.classList.add('card');
  cardBody.classList.add('card-body');
  cardTitle.classList.add('card-title');
  cardContent.classList.add('card-text');

  cardTitle.textContent = title;
  cardContent.textContent = content;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardContent);
  card.appendChild(cardBody);

  return card;
}
