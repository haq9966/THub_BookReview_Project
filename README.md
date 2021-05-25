![BFH Banner](https://trello-attachments.s3.amazonaws.com/542e9c6316504d5797afbfb9/542e9c6316504d5797afbfc1/39dee8d993841943b5723510ce663233/Frame_19.png)
# E-lib (JS-2 Book Review Platform)
E-lib is a dynamic website in which users can add books. All the features are only available after a simple Sign Up procedure.
The users will be able to review any products(books), see its details, view reviews by other users, also go to a purchase website. There is also a handy user page to track recent activity. We have also provide various means to sort the books, by author, by genre, by language. It is also possible to search for a book manually.
    
The front end was created using express-handlebars, back end was facilitated by node.js and mongodb. There are two modules admin and users, as the name suggests it provide administrator and user previlages respectively.
    
This is only the core of an ambitious project. It is possible to further enhance this site by adding more features like audiobooks, further increasing the collection of books, providing multiple purchase links, signing in with the popular social media accounts, creating a companion mobile app, in browser e-book reader are some of the plethora of features that could possibly be added in the near future.

Website: [e-Lib](https://traversa.live/)
## Team members

1. Abdul Hakeem [https://github.com/haq9966]
2. Muhammed Munees M [https://github.com/muneesmmm]
3. Akshai Kumar MR [https://github.com/AKSHAYKUMARMR]

## Team Id
BFH/rec1ibpKt5BmhDZhh/2021

## Link to product walkthrough
[https://www.loom.com/share/ba2665dfd01140a7aa0dbffb900952c4]

...
    
## Requirements

For development, you will only need Node.js and a node global package, installed in your environment.

### Node
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="300"
    />
  </a>
  
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    vx.x.x

    $ npm --version
    x.x.x

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Web Framework
[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

  Fast, unopinionated, minimalist web framework for [node](http://nodejs.org)

## Install

    $ git clone https://github.com/muneesmmm/bookreview.git
    $ cd PROJECT_TITLE
    $ npm install

___

## Run

      $ npm start
## Project Run @ $ localhost:3000

## Troubleshooting

Incase of any errors pertaining to bcrypt module, navigate to the file `node_modules` and delete the file named `bcrypt`. Then complete the step by performing the following commands.
    
    $ npm install bcrypt
    $ npm audit fix --force
