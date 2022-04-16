let app = angular.module("rootapp", [])

app.service('r', function () {
    let route = "adminHomeBtc"
    this.getroute = function () {
        return route;
    }

    this.setroute = function (value) {
        route = value;
    }
})

// adminHomeBtc
app.controller('onClickClick', function ($scope, $http, r) {
    $scope.route = r.getroute()
    console.log($scope.route);

    $scope.clickCount = 0;
    $http(
        {
            method: 'POST',
            url: 'http://localhost:4000/?query=' +
                `{listListings{listing_title description street city postal_code price email username}}`,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res2 => {
            $scope.Listings = res2.data.data.listListings
        })
        .catch(err2 => {

        })


    $scope.increment = function () {
        $scope.clickCount = $scope.clickCount + 1
        $http(
            {
                method: 'POST',
                url: 'http://localhost:4000/?query=' +
                    `mutation {CreateListing( listing_title:"${$scope.listing_title}",description:"${$scope.description}",street:"${$scope.street}",city:"${$scope.city}",postal_code:"${$scope.postal_code}",price:${$scope.price},email:"${$scope.email}",username:"${$scope.username}"){listing_title description street city postal_code price email username}}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                $http(
                    {
                        method: 'POST',
                        url: 'http://localhost:4000/?query=' +
                            `{listListings{listing_title description street city postal_code price email username}}`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(res2 => {
                        $scope.Listings = res2.data.data.listListings
                    })
                    .catch(err2 => {

                    })
            })
            .catch(function (res) {
                console.log(res);
            })
    }
})

// adminSignup
app.controller('onClickClick2', function ($scope, $http, r) {
    $scope.clickCount = 0;
    $scope.route = r.getroute()
    $scope.increment = function () {
        $scope.clickCount = $scope.clickCount + 1
        $http(
            {
                method: 'POST',
                url: 'http://localhost:4000/?query=' +
                    `mutation{ AddUser(username:\"${$scope.username}\",firstname:\"${$scope.firstname}\",lastname:\"${$scope.lastname}\",password:\"${$scope.password}\",email:\"${$scope.email}\",type:admin){type}}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                location.replace('adminlogin.html')
                console.log(res.data);
            })
            .catch(function (res) {
                console.log(res);
            })
    }
})

// adminLogin
app.controller('onClickClick3', function ($scope, $http, r) {
    $scope.clickCount = 0;
    $scope.route = r.getroute()
    $scope.increment = function () {
        $scope.clickCount = $scope.clickCount + 1
        $http(
            {
                method: 'POST',
                url: 'http://localhost:4000?query=' +
                    `{login_admin(username:"${$scope.username}",password:"${$scope.password}")}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                if (res.data.data.login_admin === true) {
                    location.replace('admin.home.html')
                } else {
                    alert("Invalid User")
                }
            })
            .catch(function (res) {
                console.log(res);
            })
    }
})

// home
app.controller('onClickClick4', function ($scope, $http, r) {
    $scope.clickCount = 0;
    $scope.route = r.getroute()
    $scope.listing_id = "";
    $scope.select = function (prop) {
        $scope.listing_id = prop;
    }
    $http(
        {
            method: 'POST',
            url: 'http://localhost:4000/?query=' +
                `{listListings{listing_title listing_id description street city postal_code price email username}}`,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res2 => {
            $scope.Listings = res2.data.data.listListings
            console.log($scope.Listings);
        })
        .catch(err2 => {

        })

    $http(
        {
            method: 'POST',
            url: 'http://localhost:4000/?query=' +
                `{listBookings{listing_id booking_id booking_start booking_end username}}`,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res2 => {
            $scope.Bookings = res2.data.data.listBookings
            console.log($scope.Bookings);
        })
        .catch(err2 => {

        })


    $scope.increment = function () {
        $http(
            {
                method: 'POST',
                url: 'http://localhost:4000/?query=' +
                    `mutation{ AddUser(username:\"${$scope.username}\",firstname:\"${$scope.firstname}\",lastname:\"${$scope.lastname}\",password:\"${$scope.password}\",email:\"${$scope.email}\",type:customer){type}}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                location.replace('login.html')
                console.log(res.data);
            })
            .catch(function (res) {
                console.log(res);
            })
    }

    $scope.BookListing = function () {
        $http(
            {
                method: 'POST',
                url: 'http://localhost:4000/?query=' +
                    `mutation {BookListing(listing_id:"${$scope.listing_id}", booking_date:"${$scope.booking_date}", booking_start:"${$scope.booking_start}", booking_end:"${$scope.booking_end}", username:"${$scope.username}") {listing_id booking_id booking_start booking_end username}}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res2 => {
                $scope.Bookings = res2.data.data.Bookings
                console.log($scope.Bookings);
            })
            .catch(err2 => {

            })
    }
})

// Login
app.controller('onClickClick5', function ($scope, $http, r) {
    $scope.clickCount = 0;
    $scope.route = r.getroute()
    $scope.increment = function () {
        $scope.clickCount = $scope.clickCount + 1
        $http(
            {
                method: 'POST',
                url: 'http://localhost:4000?query=' +
                    `{login_customer(username:"${$scope.username}",password:"${$scope.password}")}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                if (res.data.data.login_customer === true) {
                    location.replace('home.html')
                } else {
                    alert("Invalid User")
                }
            })
            .catch(function (res) {
                console.log(res);
            })
    }
})

// singup
app.controller('onClickClick6', function ($scope, $http, r) {
    $scope.clickCount = 0;
    $scope.route = r.getroute()
    $scope.increment = function () {
        $scope.clickCount = $scope.clickCount + 1
        $http(
            {
                method: 'POST',
                url: 'http://localhost:4000/?query=' +
                    `mutation{ AddUser(username:\"${$scope.username}\",firstname:\"${$scope.firstname}\",lastname:\"${$scope.lastname}\",password:\"${$scope.password}\",email:\"${$scope.email}\",type:customer){type}}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function (res) {
                location.replace('login.html')
                console.log(res.data);
            })
            .catch(function (res) {
                console.log(res);
            })
    }
})