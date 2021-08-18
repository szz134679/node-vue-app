/*
 Navicat Premium Data Transfer

 Source Server         : MongoDB
 Source Server Type    : MongoDB
 Source Server Version : 30204
 Source Host           : localhost:27017
 Source Schema         : nodeCRM

 Target Server Type    : MongoDB
 Target Server Version : 30204
 File Encoding         : 65001

 Date: 18/08/2021 13:59:13
*/


// ----------------------------
// Collection structure for profiles
// ----------------------------
db.getCollection("profiles").drop();
db.createCollection("profiles");

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");
db.getCollection("users").createIndex({
    email: NumberInt("1")
}, {
    name: "email_1",
    background: true,
    unique: true
});
