# 0x04. Files manager

This project is a Python script that can manage files and folders on a Linux system. It can perform various operations such as creating, deleting, moving, copying, renaming, searching, and listing files and folders. It can also handle file permissions, ownership, and timestamps.

## Requirements

- Python 3.8 or higher
- Linux operating system

## Usage

To run the script, use the following command:

```bash
python3 files_manager.py [options] [arguments]
```

The script accepts the following options:

- `-h` or `--help`: show the help message and exit
- `-v` or `--version`: show the program's version number and exit
- `-c` or `--create`: create a file or a folder
- `-d` or `--delete`: delete a file or a folder
- `-m` or `--move`: move a file or a folder to another location
- `-cp` or `--copy`: copy a file or a folder to another location
- `-r` or `--rename`: rename a file or a folder
- `-s` or `--search`: search for a file or a folder by name, size, type, or content
- `-l` or `--list`: list all files and folders in a given directory
- `-p` or `--permissions`: change the permissions of a file or a folder
- `-o` or `--owner`: change the owner of a file or a folder
- `-t` or `--timestamp`: change the timestamp of a file or a folder

The arguments depend on the option chosen. For more details, use the `-h` option.

## Examples

Here are some examples of how to use the script:

- To create an empty file named `test.txt` in the current directory, use:

```bash
python3 files_manager.py -c test.txt
```

- To create a folder named `test_dir` in the current directory, use:

```bash
python3 files_manager.py -c test_dir -f
```

The `-f` flag indicates that the argument is a folder.

- To delete a file named `test.txt` in the current directory, use:

```bash
python3 files_manager.py -d test.txt
```

- To delete a folder named `test_dir` in the current directory, use:

```bash
python3 files_manager.py -d test_dir -f
```

The `-f` flag indicates that the argument is a folder.

- To move a file named `test.txt` from the current directory to another directory named `new_dir`, use:

```bash
python3 files_manager.py -m test.txt new_dir/
```

The `/` at the end of the destination indicates that it is a directory.

- To move a folder named `test_dir` from the current directory to another directory named `new_dir`, use:

```bash
python3 files_manager.py -m test_dir new_dir/ -f
```

The `-f` flag indicates that the argument is a folder.

- To copy a file named `test.txt` from the current directory to another directory named `new_dir`, use:

```bash
python3 files_manager.py -cp test.txt new_dir/
```

The `/` at the end of the destination indicates that it is a directory.

- To copy a folder named `test_dir` from the current directory to another directory named `new_dir`, use:

```bash
python3 files_manager.py -cp test_dir new_dir/ -f
```

The `-f` flag indicates that the argument is a folder.

- To rename a file named `test.txt` in the current directory to `new_test.txt`, use:

```bash
python3 files_manager.py -r test.txt new_test.txt
```

- To rename a folder named `test_dir` in the current directory to `new_test_dir`, use:

```bash
python3 files_manager.py -r test_dir new_test_dir -f
```

The `-f` flag indicates that the argument is a folder.

- To search for all files with `.txt` extension in the current directory, use:

```bash
python3 files_manager.py -s .txt -t f
```

The `-t f` flag indicates that the type of the argument is file.

- To search for all folders with `dir` in their names in the current directory, use:

```bash
python3 files_manager.py -s dir -t d
```

The `-t d` flag indicates that the type of the argument is directory.

- To search for all files with `hello` in their content in the current directory, use:

```bash
python3 files_manager.py -s hello -c
```

The `-c` flag indicates that the argument is the content of the file.

- To list all files and folders in the current directory, use:

```bash
python3 files_manager.py -l
```

- To list all files and folders in another directory named `new_dir`, use:

```bash
python3 files_manager.py -l new_dir/
```

The `/` at the end of the argument indicates that it is a directory.

- To change the permissions of a file named `test.txt` in the current directory to `rwxr-xr-x`, use:

```bash
python3 files_manager.py -p test.txt 755
```

The argument `755` is the octal representation of the permissions.

- To change the permissions of a folder named `test_dir` in the current directory to `rwxrwxrwx`, use:

```bash
python3 files_manager.py -p test_dir 777 -f
```

The `-f` flag indicates that the argument is a folder.

- To change the owner of a file named `test.txt` in the current directory to `user1`, use:

```bash
python3 files_manager.py -o test.txt user1
```

The argument `user1` is the name of the new owner.

- To change the owner of a folder named `test_dir` in the current directory to `user1`, use:

```bash
python3 files_manager.py -o test_dir user1 -f
```

The `-f` flag indicates that the argument is a folder.

- To change the timestamp of a file named `test.txt` in the current directory to `2023-10-02 22:04:09`, use:

```bash
python3 files_manager.py -t test.txt 2023-10-02 22:04:09
```

The argument `2023-10-02 22:04:09` is the date and time in ISO format.

- To change the timestamp of a folder named `test_dir` in the current directory to `2023-10-02 22:04:09`, use:

```bash
python3 files_manager.py -t test_dir 2023-10-02 22:04:09 -f
```

The `-f` flag indicates that the argument is a folder.

## Tasks

The project consists of 12 tasks, each with a specific requirement and objective. The tasks are as follows:

- [0. Create]: Write a function that creates an empty file or a folder. [Link](./alx-files_manager/blob/main/0-create)
- [1. Delete]: Write a function that deletes a file or a folder. [Link](./alx-files_manager/blob/main/1-delete)
- [2. Move]: Write a function that moves a file or a folder to another location. [Link](./alx-files_manager/blob/main/2-move)
- [3. Copy]: Write a function that copies a file or a folder to another location. [Link](./alx-files_manager/blob/main/3-copy)
- [4. Rename]: Write a function that renames a file or a folder. [Link](./alx-files_manager/blob/main/4-rename)
- [5. Search]: Write a function that searches for a file or a folder by name, size, type, or content. [Link](./alx-files_manager/blob/main/5-search)
- [6. List]: Write a function that lists all files and folders in a given directory. [Link](./alx-files_manager/blob/main/6-list)
- [7. Permissions]: Write a function that changes the permissions of a file or a folder. [Link](./alx-files_manager/blob/main/7-permissions)
- [8. Owner]: Write a function that changes the owner of a file or a folder. [Link](./alx-files_manager/blob/main/8-owner)
- [9. Timestamp]: Write a function that changes the timestamp of a file or a folder. [Link](./alx-files_manager/blob/main/9-timestamp)
- [10. Main]: Write the main function that parses the command-line arguments and calls the appropriate functions. [Link](./alx-files_manager/blob/main/10-main)
- [11. Test]: Write unit tests for all functions using the unittest module. [Link](./alx-files_manager/blob/main/11-test)

[![Coverage Status](https://coveralls.io/repos/github/B3zaleel/alx-files_manager/badge.svg?branch=main)](https://coveralls.io/github/B3zaleel/alx-files_manager?branch=main)

A simple file management API built with Express, MongoDB, Redis, Bull, and Node.js.

## Requirements

### Applications

+ Node.js
+ Yarn (the package manager/resource negotiator)

### APIs

+ A Google API should be created with at least an email sending scope and a valid URL (e.g.; `http://localhost:5000/`) should be one of the redirect URIs. The `credentials.json` file should be stored in the root directory of this project.

### Environment Variables

The required environment variables should be stored in a file named `.env` and each line should have the format `Name=Value`. The table below lists the environment variables that will be used by this server:

| Name | Required | Description |
|:-|:-|:-|
| GOOGLE_MAIL_SENDER | Yes | The email address of the account responsible for sending emails to users. |
| PORT | No (Default: `5000`)| The port the server should listen at. |
| DB_HOST | No (Default: `localhost`)| The database host. |
| DB_PORT | No (Default: `27017`)| The database port. |
| DB_DATABASE | No (Default: `files_manager`)| The database name. |
| FOLDER_PATH | No (Default: `/tmp/files_manager` (Linux, Mac OS X) & `%TEMP%/files_manager` (Windows)) | The local folder where files are saved. |

## Installation

+ Clone this repository and switch to the cloned repository's directory.
+ Install the packages using `yarn install` or `npm install`.

## Usage

Start the Redis and MongoDB services on your system and run `yarn start-server` or `npm run start-server`.

## Tests

+ Create a separate `.env` file for the tests named `.env.test` and store the value of the environment variables for the testing event in it.
+ Run `yarn test` or `npm run test` to execute the E2E tests.

## Documentation

+ TODO: Generate OpenAPI documentation with [**apidoc**](https://www.npmjs.com/package/apidoc).

## RESOURCES
+ [x] [Node JS getting started](https://intranet.alxswe.com/rltoken/8jNm2s_LfVKMqR3vHLn_uw)
+ [x] [Process API doc](https://intranet.alxswe.com/rltoken/uYPplj2cPK8pcP0LtV6RuA)
+ [x] [Express getting started](https://intranet.alxswe.com/rltoken/SujfeWKCWmUMomfETjETEg)
+ [x] [Mocha documentation](https://intranet.alxswe.com/rltoken/FzEwplmoZiyGvkgKllZNJw)
+ [x] [Nodemon documentation](https://intranet.alxswe.com/rltoken/pdNNTX0OLugbhxvP3sLgOw)
+ [x] [MongoDB](https://intranet.alxswe.com/rltoken/g1x7y_3GskzVAJBTXcSjmA)
+ [x] [Bull](https://intranet.alxswe.com/rltoken/NkHBpGrxnd0sK_fDPMbihg)
+ [x] [Image thumbnail](https://intranet.alxswe.com/rltoken/KX6cck2nyLpQOTDMLcwxLg)
+ [x] [Mime-Types](https://intranet.alxswe.com/rltoken/j9B0Kc-4HDKLUe88ShbOjQ)
+ [x] [Redis](https://intranet.alxswe.com/rltoken/nqwKRszO8Tkj_ZWW1EFwGw)      
