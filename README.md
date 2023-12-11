# E-Commerce platform project

---

## Context

---
The idea of this project is to create the APIs to manage both the admin side and the public side 
of an e-commerce web platform.

##### As an admin:
It will be possible to manage the products catalog and to handle users orders.
As well as managing other admin accounts.

##### As a public user:
It will be possible to create an account, login and have a proper shopping experience 


## Features

---
##### An admin can:
* Create another admin account
* Delete another admin account
* Browse admin accounts
* Change its own password
* CRUD products
* Browse orders
* Update orders statuses

##### A public user can:
* Sign-in
* Login
* Browse products
* Add product to its shopping cart
* Get its shopping cart
* Update its shopping cart
* Proceed to order
* Browse its orders


## Architectural decision

---

*TL;DR*

| ![DB schema](prismaliser-immfly.png) | 
|:------------------------------------:| 
|             *DB Schema*              |

As the different entities that would be needed for this project are tightly coupled between each other
(eg: users and carts/orders/addresses)
I decided to opt for a relational database.

For this quick project and for the ease of use, I choose to go with a simple sqlite database.

For a production ready application, it would indeed need a more robust DB.


## Folder structures

---

 TODO

## How to query the APIs

---

You can get the full collection of all endpoints with the following [Insomnia](https://insomnia.rest/) file available at the root of the project

_**insomnia-collection.json**_

Simply import the file into your insomnia workspace and you're all set ! 

