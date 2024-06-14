import Phaser from 'phaser';
import I18nSingleton from 'i18n/I18nSingleton';
import WebFont from 'webfontloader';

export default class RankingScene extends Phaser.Scene {

     // data not > 6 (max 6)
     private allData: { 
          id: string,
          name: string, 
          score: number, 
          played: number 
     }[] = [];

     private dataSortByScore: { 
          id: string,
          name: string, 
          score: number, 
          played: number 
     }[] = [];

     private dataSortByPlayed: { 
          id: string,
          name: string, 
          score: number, 
          played: number 
     }[] = [];

     private myData: { 
          id: string,
          name: string, 
          score: number, 
          played: number 
     } = {
          id: '',
          name: '',
          score: 0,
          played: 0
      };
     
     // TODO initial my player id
     private myPlayerID: string = '1';

     private onScorePage: boolean = true;

     private i18n: I18nSingleton = I18nSingleton.getInstance();

     private texts: Phaser.GameObjects.Text[] = [];

     private textsInSlot: Phaser.GameObjects.Text[] = [];
    
     constructor() {
          super({ key: 'ranking' });
     }

     // first loading (constructor ?)
     private loadingData(): void {

          // fetch data
          // TODO real fetching data
          const fakeData = [
               { 
                    id: '1', 
                    name: 'พีซZA5555555555555555', 
                    score: 100000 , 
                    played: 50
               },
               { 
                    id: '2', 
                    name: 'ญญญญญญญญญญญญญญญญญญญญ', 
                    score: 9999999999 , 
                    played: 60
               },
               { 
                    id: '3', 
                    name: "น้องลาคูนี่888", 
                    score: 80000 , 
                    played: 40
               },
               { 
                    id: '4', 
                    name: 'จิ๊บ', 
                    score: 700000 , 
                    played: 20},
               { 
                    id: '5', 
                    name: 'เจนนี่', 
                    score: 700000 , 
                    played: 8

               },
               { 
                    id: '6', 
                    name: 'บูม', 
                    score: 999999995 , 
                    played: 999

               },
               { 
                    id: '7', 
                    name: 'กิ๊ก', 
                    score: 6999999 , 
                    played: 11

               },
               { 
                    id: '8', 
                    name: 'IM C', 
                    score: 100100 , 
                    played: 6

               }
          ]

          this.allData = fakeData;

          // initial my data
          this.onScorePage = true;
          
          // TODO myPlayerID define
          const temp = this.allData.find(
               player => player.id === this.myPlayerID
          );

          if (temp) this.myData = temp
          else console.log('my data is empty');


     }

     private sortScore(): void {
          this.allData.sort(
               (a, b) => b.score - a.score
          ).forEach( 
               data => this.dataSortByScore.push(data)
          );
     }

     private sortPlayed(): void {
          this.allData.sort(
               (a, b) => b.played - a.played
          ).forEach( 
               data => this.dataSortByPlayed.push(data)
          );
     }

     private setAllFont(allText: Phaser.GameObjects.Text[]): void {
          // Set font for all texts
          WebFont.load({
               google: {
                    families: ['Mali:Bold 700','Sarabun:Regular 400']
               },
               active: () => {
                    const menuUiStyle = {
                         fontFamily: 'Mali',
                         fontStyle: 'Bold',
                         fontWeight: 700
                         
                    }
                    allText.forEach( text => {
                              text.setStyle(menuUiStyle);
                              text.setPadding(0,20,0,10);
                              text.setVisible(true);
                         }
                    );
               }
          });
     }

     private lengthOfString(username: string): {length: number, noCnt: number} {
          let length = username.length;
          let noCnt = 0;
          const pattern = /[่้๊๋ิี็ํูืฺุ]/;

          for (let char of username) {
               if (pattern.test(char)) {
                    noCnt++;
               }
          }

          length = length - noCnt;


          return {length, noCnt};
     }

     private formatTextNumberSlot(str: string, n: number): string {
          let fstr = '';
          
          str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          if (str.length > n) {
               fstr = str.substring(0, n) + '...';
          } else {
               fstr = str;
          }

          return fstr;
     }

     private formatTextNameSlot(str: string, n: number): string {
          let fstr = '';
          const { length, noCnt } = this.lengthOfString(str);
 
          if (length > n) {
               fstr = str.substring(0, n + noCnt) + '...';
          } else {
               fstr = str;
          }

          return fstr;
     }


     private goToHome(): void {
          console.log('back to home!')
          // TODO go to home function and less resource

          // clear the array
          this.texts.length = 0;
          this.textsInSlot.length = 0;

          // go to title scene
          this.scene.start('home');

     }


     preload() {
          this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
          this.load.image('bg', 'assets/background/submenu-background.png');
          this.load.atlas('heading', 'assets/ui/heading_spritesheet.png', 'assets/ui/heading_spritesheet.json');
          this.load.atlas('icon', 'assets/icon/homepage/icon_spritesheet.png', 'assets/icon/homepage/icon_spritesheet.json');
     }


     create() {

          // init
          this.loadingData();
          this.sortScore();
          this.sortPlayed();
          
          const { width, height } = this.scale;
          const rbx = 48;
          const rby = 435;
          

          // bg
          this.add.tileSprite( 0, 0, width, height, 'bg')
               .setOrigin(0)
               .setScrollFactor(0,0);
          

          // heading
          this.add.image(268.03, 48, 'icon', 'icon_ranking.png')
               .setOrigin(0)
               .setScale(2.5);
          this.add.image( 96.02, 168.86, 'heading', 'heading_red.png' )
               .setOrigin(0);
          const headingText = this.i18n.createTranslatedText(
               this, 285, 165, 'ranking_title'
          )
               .setFontSize(42)
               .setColor('#ffffff')
               .setStroke('#9E461B', 12)
          this.texts.push(headingText);
          

          // button
          const bsx = 88;
          const by = 360;
          const bpx = 368;
          const buttonScore = this.add.graphics();
          const buttonPlayed = this.add.graphics();
          const defaultFillColor = 0xC7BEAF;
          const defaultStrokeColor = 0x958E83;
          const scoreFillColor = 0x43A99E;
          const scoreStrokeColor = 0x327F76;
          const playedFillColor = 0xFFAA04;
          const playedStrokeColor = 0xBF7F03;
          const buttonScoreText = this.i18n.createTranslatedText(
               this, 110, 355, 'accumulate_score'
          )
               .setFontSize(32)
               .setColor('#ffffff')
               .setStroke('#958E83', 8);
          this.texts.push(buttonScoreText);

          const buttonPlayedText = this.i18n.createTranslatedText(
               this, 411, 355, 'accumulate_play'
          )
               .setFontSize(32)
               .setColor('#ffffff')
               .setStroke('#958E83', 8);
          this.texts.push(buttonPlayedText);

          buttonScoreText.setDepth(1);  // to display over graphic
          buttonPlayedText.setDepth(1);

          const drawScoreButtonActive = () => {
               // draw new graphic button
               buttonScore.clear()
                    .fillStyle(scoreFillColor)
                    .lineStyle(5, scoreStrokeColor)
                    .fillRoundedRect(
                         bsx, by, 264, 80, 
                         { tl: 40, tr: 40, bl: 0, br: 0 }
                    )
                    .strokeRoundedRect(
                         bsx, by, 264, 80, 
                         { tl: 40, tr: 40, bl: 0, br: 0 }
                    );

               buttonPlayed.clear()
                    .fillStyle(defaultFillColor)
                    .lineStyle(5, defaultStrokeColor)
                    .fillRoundedRect(
                         bpx, by, 264, 80, 
                         { tl: 40, tr: 40, bl: 0, br: 0 }
                    )
                    .strokeRoundedRect(
                         bpx, by, 264, 80, 
                         { tl: 40, tr: 40, bl: 0, br: 0 }
                    );

               // text
               buttonScoreText.setStroke('#327F76', 8);
               buttonPlayedText.setStroke('#958E83', 8);
          }

          const drawPlayedButtonActive = () => {
               // draw new graphic button
               buttonScore.clear()
                    .fillStyle(defaultFillColor)
                    .lineStyle(5, defaultStrokeColor)
                    .fillRoundedRect(
                         bsx, by, 264, 80, 
                         { tl: 40, tr: 40, bl: 0, br: 0 }
                    )
                    .strokeRoundedRect(
                         bsx, by, 264, 80, 
                         { tl: 40, tr: 40, bl: 0, br: 0 }
                    );
               
               buttonPlayed.clear()
                    .fillStyle(playedFillColor)
                    .lineStyle(5, playedStrokeColor)
                    .fillRoundedRect(
                         bpx, by, 264, 80, 
                         { tl: 40, tr: 40, bl: 0, br: 0 }
                    )
                    .strokeRoundedRect(
                         bpx, by, 264, 80, 
                         { tl: 40, tr: 40, bl: 0, br: 0 }
                    );

               // text
               buttonScoreText.setStroke('#958E83', 8);
               buttonPlayedText.setStroke('#BF7F03', 8);
          }

          drawScoreButtonActive(); // draw first score active
          
          // button back (white arrow)
          const buttonBack = this.add.image(48, 48, 'icon', 'icon_white arrow.png')
               .setOrigin(0)

          // ranking box
          const rankingBox = this.add.graphics();
          rankingBox.fillStyle(0xFFF6E5)
               .lineStyle(5, 0xD35E24)
               .fillRoundedRect(rbx, rby, 624, 768, 40)
               .strokeRoundedRect(rbx, rby, 624, 768, 40);
          

          // slot
          const slotNormalFillColor = 0xFFE7BA;
          const slotScoreFillColor = 0x8FEED1;
          const slotPlayedFillColor = 0xFFD338;
          const slotWidth = 576
          const slotHeight = 88;
          const slot = this.add.graphics();
          const garbage: Phaser.GameObjects.GameObject[] = [];
          const clearGarbage = () => {
               // destroy all object
               garbage.forEach( item => {
                    item.destroy();
               });
               this.textsInSlot.forEach( text => {
                    text.destroy();
               });

               // clear the array
               garbage.length = 0;
               this.textsInSlot.length = 0;
          }

          const createSlot = (
                    x: number, y: number, 
                    textPrefix: string, textPostfix: string, 
                    index: number, isPlayer: boolean
               ) => {
               
               // slot bg
               if (isPlayer) {
                    if (this.onScorePage) slot.fillStyle(slotScoreFillColor) 
                    else slot.fillStyle(slotPlayedFillColor);
               } else {  
                    slot.fillStyle(slotNormalFillColor);
               }

               slot.fillRoundedRect(x, y, slotWidth, slotHeight, 20);
               
               // text
               // text prefix
               const tpr = this.add.text(
                    x + 96, 
                    y + 10, 
                    this.formatTextNameSlot(textPrefix, 7), 
                    { 
                         fontSize: '32px', 
                         color: '#57453B' 
                    }
               ).setVisible(false);     // will add visible when webFont was loaded
               // format username by size
               // let textPrefixLength = this.lengthOfString(textPrefix).length;
               // if (textPrefixLength > 10) {
               //      tpr.setFontSize(32 - textPrefixLength + 5);
               // }

               // text postfix
               const tpo = this.add.text(
                    x + 550, 
                    y + 10, 
                    this.formatTextNumberSlot(textPostfix, 10), 
                    { 
                         fontSize: '32px', 
                         color: '#57453B',
                    }
               ).setOrigin(1, 0).setVisible(false);

               this.textsInSlot.push(tpr);
               this.textsInSlot.push(tpo);
               
               // icon heading
               if (index == 0) {
                    // rank 1 icon
                    let rank1;

                    if (this.onScorePage) {
                         rank1 = this.add.image(
                              x + 24, 
                              y, 
                              'icon', 
                              'icon_badge_gold.png'
                         ).setOrigin(0, 0);
                    } else {
                         rank1 = this.add.image(
                              x + 24, 
                              y + 18, 
                              'icon', 
                              'icon_heart_gold.png'
                         ).setOrigin(0, 0);
                    }

                    garbage.push(rank1);

               } else if (index == 1) {
                    // rank 2 icon
                    let rank2;

                    if (this.onScorePage) {
                         rank2 = this.add.image(
                              x + 24, 
                              y, 
                              'icon', 
                              'icon_badge_silver.png'
                         ).setOrigin(0, 0);
                    } else {
                         rank2 = this.add.image(
                              x + 24, 
                              y + 18, 
                              'icon', 
                              'icon_heart_silver.png'
                         ).setOrigin(0, 0);
                    }

                    garbage.push(rank2);

               } else if (index == 2) {
                    // rank 3 icon
                    let rank3;

                    if (this.onScorePage) {
                         rank3 = this.add.image(
                              x + 24,
                              y, 
                              'icon', 
                              'icon_badge_bronze.png'
                         ).setOrigin(0, 0);
                    } else {
                         rank3 = this.add.image(
                              x + 24, 
                              y + 18, 
                              'icon', 
                              'icon_heart_bronze.png'
                         ).setOrigin(0, 0);
                    }

                    garbage.push(rank3);

               } else {
                    // normal icon
                    slot.fillStyle(0xC7BEAF)
                         .fillCircle(x + 56, y + 44, 26)
                         .lineStyle(3, 0x958E83)
                         .strokeCircle(x + 56, y + 44, 26);
               }

               // text in icon heading
               const tr = this.add.text(
                    x + 44, 
                    y + 6, 
                    String(index + 1), 
                    { 
                         fontSize: '28px', 
                         color: '#ffffff' 
                    }
               ).setVisible(false);

               if (index == 0) {
                    // rank 1 text
                    tr.setStroke('#E39600', 6);

               } else if (index == 1) {
                    // rank 2 text
                    tr.setStroke('#777777', 6);

               } else if (index == 2) {
                    // rank 3 text
                    tr.setStroke('#E39600', 6);

               } else {
                    // normal text
                    tr.setStroke('#958E83', 6);
               }

               this.textsInSlot.push(tr);
          }

          const createStackOfSlot = (x: number, y: number) => {
               // clear 
               slot.clear();
               clearGarbage();

               let data = this.onScorePage ? this.dataSortByScore : this.dataSortByPlayed;
               
               data.slice(0, Math.min(data.length, 6))
                    .forEach((player, index) => {
                         const textPrefix = player.name;
                         const textPostfix = this.onScorePage ? String(player.score) : String(player.played);
                         const isPlayer = player.id == this.myPlayerID;

                         createSlot(x, y, textPrefix, textPostfix, index, isPlayer);
                         
                         y += slotHeight + 16;
                    })
               
               // TODO delete this code when change ui
               // my slot rank
               const textPrefix = this.myData.name;
               const textPostfix = this.onScorePage ? String(this.myData.score) : String(this.myData.played);
               const index = data.findIndex(player => player.id == this.myPlayerID);
               
               createSlot(x, rby + 656, textPrefix, textPostfix, index, true);
          }
          
          
          // draw slot
          createStackOfSlot(72 , 456);
          
          // TODO my slot rank change ui
          /*// my slot rank
          const textPrefix = this.myData.name;
          const textPostfix = this.onScorePage ? String(this.myData.score) : String(this.myData.played);
          const index = data.findIndex(player => player.id == this.myPlayerID);
          
          createSlot(x, rby + 656, textPrefix, textPostfix, index, true);*/

          // event
          // button score
          buttonScore.setInteractive(
               new Phaser.Geom.Rectangle(bsx, by, 256, 80), 
               Phaser.Geom.Rectangle.Contains
          ).on('pointerup', () => {
               if (!this.onScorePage) {
                    console.log('button score click!');

                    this.onScorePage = true;
                    drawScoreButtonActive();
                    createStackOfSlot(72, 456);
                    this.setAllFont(this.textsInSlot);  // update font
               }
          });

          // button played
          buttonPlayed.setInteractive(
               new Phaser.Geom.Rectangle(bpx, by, 256, 80), 
               Phaser.Geom.Rectangle.Contains
          ).on('pointerup', () => {
               if (this.onScorePage) {
                    console.log('button played click!');

                    this.onScorePage = false;
                    drawPlayedButtonActive();
                    createStackOfSlot(72, 456);
                    this.setAllFont(this.textsInSlot); // update font
               }
          });

          // button back arrow
          buttonBack.setInteractive()
               .on('pointerup', () => {
                    this.goToHome();
               });
          
          // set Font
          this.setAllFont([...this.texts, ...this.textsInSlot]);
     }    
     

     update() {
          
     }
}