import data from "./chinese.json";

class ChineseApp {
  #sessionActive = false;

  constructor() {
    // INIT -- SAVE TO LOCAL STORAGE

    this.index = 0;
    this.words = data;
    this.stats = [
      {
        date: "July 7th, 16:33pm ",
        listDifficulty: "--",
        num: "--",
        totalDuration: 0.023,
        avgWordTime: "--",
        avgWordDifficulty: "--",
      },
    ];

    this.hard = [];
    this.medium = [];
    this.easy = [];
    this.veryEasy = [];

    ///////////////////////////////
    // If first time app is run, else load hard from local storage

    for (let e in this.words) {
      this.hard.push(this.words[e]);
    }

    ///////////////////////////////

    this.difficulties = {
      hard: this.hard,
      medium: this.medium,
      easy: this.easy,
      veryEasy: this.veryEasy,
    };

    // SESSION
    this.sessionList = [];
    this.currentWord = "No Session Active";
    this.sessionDifficultyList = "";
    this.num = 0;
    this.avgWordTimes = [];
    this.sessionStart = 0;
    this.sessionEnd = 0;
    this.sessionTotalTime = 0;

    this.sessionStats = {
      date: "July 7th, 16:33pm ",
      listDifficulty: "",
      num: "",
      totalDuration: "",
      avgWordTime: "",
      avgWordDifficulty: "",
    };
  }

  getList(name) {
    return this.difficulties[name];
  }

  startSession(list, num) {
    if (this.#sessionActive === true) {
      return console.log("Session already active");
    } else {
      console.log("Session Started");
      this.num = num;
      this.sessionStart = new Date();
      this.#sessionActive = true;
      this.sessionDifficultyList = list;

      while (this.sessionList.length < num) {
        if (!this.difficulties[list].length) {
          this.sessionList.push(
            this.words[Math.trunc(Math.random() * this.words.length)]
          );
        } else {
          this.sessionList.push(
            this.difficulties[list][
              Math.trunc(Math.random() * this.difficulties[list].length)
            ]
          );
        }
      }

      console.log(this.sessionList);
      console.log(this.index);
      this.currentWord = this.sessionList[this.index];
      console.log(this.currentWord);
    }
  }

  endSession() {
    if (this.#sessionActive === false) {
      return console.log("No session started");
    } else {
      // RESET VALUES
      this.currentWord = "";
      this.sessionEnd = new Date();
      this.sessionList = [];
      this.#sessionActive = false;

      // CALCULATE TIME TAKEN
      this.sessionTotalTime = (this.sessionEnd - this.sessionStart) / 1000;
      console.log(
        `Session Ended, Total time taken: ${this.sessionTotalTime.toFixed(
          2
        )} seconds`
      );

      this.sessionStats = {
        date: new Date(),
        listDifficulty: this.sessionDifficultyList,
        num: this.num,
        totalDuration: this.sessionTotalTime,
        avgWordTime: "",
        avgWordDifficulty: "",
      };

      console.log(this.sessionStats);

      this.stats.push(this.sessionStats);
      console.log(this.stats);
      this.num = 0;
      // LOG STATS
    }
  }

  endSessionAbrupt() {
    if (this.#sessionActive === false) {
      return console.log("No session started");
    } else {
      // RESET VALUES
      this.currentWord = "No Active Session";
      this.sessionEnd = new Date();
      this.sessionList = [];
      this.#sessionActive = false;

      // CALCULATE TIME TAKEN
      this.sessionTotalTime = (this.sessionEnd - this.sessionStart) / 1000;
      console.log(
        `Session ended abruptly, Stats not logged - Total time taken: ${this.sessionTotalTime.toFixed(
          2
        )} seconds`
      );
    }
  }

  nextWord() {
    if (!this.getSessionActive()) {
      console.log("No session Active");
    } else {
      if (this.index < this.sessionList.length - 1) {
        this.index++;
        this.currentWord = this.sessionList[this.index];
        console.log(this.index);
        console.log(this.currentWord.hanzi);
      } else {
        this.endSession();
        console.log("Session Complete");
        this.index = 0;
      }
    }
  }

  getRandomWord() {
    return this.words[Math.trunc(Math.random() * this.words.length)];
  }

  getSessionActive() {
    return this.#sessionActive;
  }

  listManage(list) {
    if (!this.getSessionActive()) {
      return console.log("No session active");
    } else {
      if (this.difficulties[list]?.includes(this.currentWord)) {
        return console.log("Word already in selected List");
      } else {
        for (let i in this.difficulties) {
          if (i !== list) {
            if (this.difficulties[i]?.includes(this.currentWord)) {
              const wordIndex = this.difficulties[i]?.indexOf(this.currentWord);

              this.difficulties[i].splice(wordIndex, 1);
              this.difficulties[list].push(this.currentWord);

              console.log(i, wordIndex);
              console.log(this.difficulties[list]);
            }
          }
        }
      }
    }
  }
}

export default ChineseApp;
