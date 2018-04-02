# Foodrun
Project 1 - Front End Engineering

## Installation and Setup
### Important Note
* These instructions were written with the intention of setting up and running a local copy of Foodrun. To set Foodrun up on a remote server,
please substitute "localhost:2403" for the proper location and port of your server.

### Requirements
* deployd - [Install Instructions](https://github.com/deployd/deployd#install-from-npm) | [Website](http://deployd.com/) | [GitHub](https://github.com/deployd/deployd)
  * deployd is a backend collection manager that will function as the database system for Foodrun
  * Follow their install instructions to the letter (including downloading and installing Node.js and MongoDB)
  * **Important:** deployd is required for Foodrun to function; it must be running any time you wish to use Foodrun (see instructions below)
* The Foodrun "Proj_1_Backend" folder, which contains all files and folders necessary for the proper functioning of Foodrun

### Getting Set Up
1. After making sure that deployd and its prerequisites have been properly installed on the target system, extract "Proj_1_Backend"
to a folder of your choice.
   1. The "Proj_1_Backend" folder itself is not necessary to the functioning of Foodrun, only the files within; feel free to rename the folder
  to whatever you wish (for the sake of this document, we will continue using the name "Proj_1_Backend").
   1. This folder will function as Foodrun's backend, and it is where deployd will perform all of its file operations.
1. Open a terminal (command prompt on Windows) window, and change directory to the inside of "Proj_1_Backend"
   1. Windows Example: `cd C:\Users\username\Documents\Proj_1_Backend`
   1. OSX/Linux Example: `cd /home/user/Documents/Proj_1_Backend`
1. Start deployd using the command: `dpd -d`
1. Deployd should automatically open a browser tab/window directing you to its dashboard.
   1. If it does not, this system can be reached by visiting http://localhost:2403/dashboard
   1. The Foodrun webpage can be reached at http://localhost:2403
1. With this system running properly, Foodrun (being largely plug-and-play) is ready to use!
