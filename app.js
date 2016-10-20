  let app = angular.module('mailpost', ['ui.router']);

  app.config(function($stateProvider) {
    
    $stateProvider.state('mailbox', {
      url: ':login/:password/mailbox/',
      resolve: {
        access: function($stateParams, $q) {
          if ($stateParams.login == 'mail@mail.com' && $stateParams.password == '111') {
            return $q.when({status: true});
          } else {
            alert('Your login/password is incorrect!')
            return $q.reject();
          }
        }
      },
      controller: function($stateParams, $scope, access) {
        $scope.access = access;
      },
      template: `<mailbox />`
    });

    $stateProvider.state('boxtypes', {
      parent: 'mailbox',
      url: 'boxtypes',
      template: `<boxtypes />`
    })
    .state('box', {
      parent: 'boxtypes',
      url: '/box-:boxId',
      template: `<box box-id="boxId"/>`,
      controller: function($stateParams, $scope) {
        $scope.boxId = $stateParams.boxId;
      }
    })
    .state('mail', {
      parent: 'box',
      url: '/mail-:mailId',
      template: `<mail mail-id="mailId"/>`,
      controller: function($stateParams, $scope) {
        $scope.mailId = $stateParams.mailId;
      }
    });

    $stateProvider.state('users', {
      parent: 'mailbox',
      url: 'users',
      template: `<users />`
    })
    .state('status', {
      parent: 'users',
      url: '/status-:statusId',
      template: `<status status-id="statusId"/>`,
      controller: function($stateParams, $scope) {
        $scope.statusId = $stateParams.statusId;
      }
    })
    .state('user', {
      parent: 'status',
      url: '/user-:userId',
      template: `<user user-id="userId"></user>`,
      controller: function($stateParams, $scope) {
        $scope.userId = $stateParams.userId;
      }
    });
    
  });

  app.component('mailbox', {
      templateUrl: 'mailbox.tpl.html'
    })
    .component('boxtypes', {
      templateUrl: 'mails.tpl.html'
    })
    .component('box', {
      bindings: {
        boxId: '<',
      },
      templateUrl: 'boxtype.tpl.html',
      controller: function() {
        this.mails = {
          1: [{
            'id': 1,
            'shorttext': 'test',
            'date': '20:37:24 04/10/2016',
            'sender': 'Clarc',
            'subject': 'Another one subject',
            'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }, {
            'id': 2,
            'shorttext': 'test2',
            'date': '04:23:47 03/10/2016',
            'sender': 'Kim',
            'subject': 'Subject from Kim',
            'text': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }, {
            'id': 3,
            'shorttext': 'test3',
            'date': '09:37:40 02/10/2016',
            'sender': 'Alan',
            'subject': 'Third subject',
            'text': 'Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }, {
            'id': 4,
            'shorttext': 'test4',
            'date': '09:37:40 02/10/2016',
            'sender': 'Dennis',
            'subject': 'Fourth subject',
            'text': '1Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }],
          2: [{
            'id': 1,
            'shorttext': 'test4',
            'date': '20:37:24 04/10/2016',
            'sender': 'John',
            'subject': 'First subject',
            'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }, {
            'id': 2,
            'shorttext': 'test5',
            'date': '04:23:47 03/10/2016',
            'sender': 'Sam',
            'subject': 'Second subject',
            'text': 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }, {
            'id': 3,
            'shorttext': 'test36',
            'date': '09:37:40 02/10/2016',
            'sender': 'Alan',
            'subject': 'Third subject',
            'text': 'Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }],
          3: [{
            'id': 1,
            'shorttext': 'test36',
            'date': '09:37:40 02/10/2016',
            'sender': 'Alex',
            'subject': 'Another subject',
            'text': '22Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }],
          4: [{
            'id': 1,
            'shorttext': 'test36',
            'date': '09:37:40 02/10/2016',
            'sender': 'Susy',
            'subject': 'Another subject from Susy',
            'text': '22Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }, {
            'id': 2,
            'shorttext': 'test36',
            'date': '09:37:40 02/10/2016',
            'sender': 'Sasha',
            'subject': 'Subject from Sasha',
            'text': '22Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }]
        }
      }
    })
    .component('mail', {
      bindings: {
        mailId: '<',
      }
    });

  app.component('users', {
      templateUrl: 'users.tpl.html'
    })
    .component('status', {
      bindings: {
        statusId: '<',
      },
      templateUrl: 'userstatus.tpl.html',
      controller: function() {
        this.users = {
          /*1: [1, 2, 3],
          2: [4, 5, 6],
          3: [7, 8, 9]*/
            
          1: [{
            'id': 1,
            'fullName': 'Samson',
            'birthdate': '04/10/2016',
            'gender': 'M',
            'address': '7, Baker Str.',
            'email': 'mail@mail.com'
          }, {
            'id': 2,
            'fullName': 'Sara',
            'birthdate': '03/10/2016',
            'gender': 'F',
            'address': 'Duisburg 777',
            'email': 'mail@gmail.com'
          }, {
            'id': 3,
            'fullName': 'Andrew',
            'birthdate': '02/10/2016',
            'gender': 'M',
            'address': '5th Avenu, 2',
            'email': 'mail@mail.ru'
          }],
          2: [{
            'id': 1,
            'fullName': 'Lagerta',
            'birthdate': '04/10/2016',
            'gender': 'M',
            'address': 'World',
            'email': 'mail@mail.de'
          }]
        }
      }
    });