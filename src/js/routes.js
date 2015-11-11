/*global define*/
define(function () {
    'use strict';

    // The routes for the application. This module returns a function.
    // `match` is match method of the Router
    return function (match) {
        match('', 'home#show');
        match('home', 'home#show');
        match('inputData', 'inputData#show');
        match('about', 'about#show');
        match('statistics/microdata', 'statistics-microdata#show');
        match('statistics/analysis', 'statistics-analysis#show');
        match('dashboard/:uid', 'dashboard#show');
        match('ready', 'ready#show');
        match('ready/:id', 'ready#show');
        match('*anything', '404#show');
    };
});
