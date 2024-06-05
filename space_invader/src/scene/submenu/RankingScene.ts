import Phaser from 'phaser';

export default class RankingScene extends Phaser.Scene {

     // data not > 6 (max 6)
     private fakeData: { 
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
     
     private myPlayerID: string = '1';

     private onScorePage: boolean = true;

    
     constructor() {
          super({ key: 'RankingScene' });
     }

     loadingData(): void {

          // fetch data
          // TODO real fetching data
          this.fakeData = [
               { id: '1', name: 'Player 1', score: 100 , played: 50},
               { id: '2', name: 'Player 2', score: 90 , played: 60},
               { id: '3', name: 'Player 3', score: 80 , played: 40},
               { id: '4', name: 'Player 4', score: 70 , played: 20},
               { id: '5', name: 'Player 5', score: 60 , played: 10}
          ]

          // initial my data
          // TODO myPlayerID define
          const temp = this.fakeData.find(player => player.id === this.myPlayerID);
          if (temp) this.myData = temp
          else console.log('data is empty');

     }

     sortScore(): void {
          this.fakeData.sort((a, b) => b.score - a.score);
          this.fakeData.forEach( data => this.dataSortByScore.push(data));
     }

     sortPlayed(): void {
          this.fakeData.sort((a, b) => b.played - a.played);
          this.fakeData.forEach( data => this.dataSortByPlayed.push(data));
     }

     preload() {
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
          this.add.tileSprite( 0, 0, width, height, 'bg').setOrigin(0).setScrollFactor(0,0);
          
          // heading
          this.add.image(268.03, 48, 'icon', 'icon_ranking.png').setOrigin(0).setScale(2.5);
          this.add.image( 96.02, 168.86, 'heading', 'heading_red.png' ).setOrigin(0);
          
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
          const drawScoreButtonActive = () => {
               // draw new graphic button
               buttonScore.clear();
               buttonScore.fillStyle(scoreFillColor);
               buttonScore.lineStyle(5, scoreStrokeColor);
               buttonScore.fillRoundedRect(bsx, by, 264, 80, { tl: 40, tr: 40, bl: 0, br: 0 }); 
               buttonScore.strokeRoundedRect(bsx, by, 264, 80, { tl: 40, tr: 40, bl: 0, br: 0 });
               buttonPlayed.clear();
               buttonPlayed.fillStyle(defaultFillColor);
               buttonPlayed.lineStyle(5, defaultStrokeColor);
               buttonPlayed.fillRoundedRect(bpx, by, 264, 80, { tl: 40, tr: 40, bl: 0, br: 0 }); 
               buttonPlayed.strokeRoundedRect(bpx, by, 264, 80, { tl: 40, tr: 40, bl: 0, br: 0 });
          }
          const drawPlayedButtonActive = () => {
               // draw new graphic button
               buttonScore.clear();
               buttonScore.fillStyle(defaultFillColor);
               buttonScore.lineStyle(5, defaultStrokeColor);
               buttonScore.fillRoundedRect(bsx, by, 264, 80, { tl: 40, tr: 40, bl: 0, br: 0 }); 
               buttonScore.strokeRoundedRect(bsx, by, 264, 80, { tl: 40, tr: 40, bl: 0, br: 0 });
               buttonPlayed.clear();
               buttonPlayed.fillStyle(playedFillColor);
               buttonPlayed.lineStyle(5, playedStrokeColor);
               buttonPlayed.fillRoundedRect(bpx, by, 264, 80, { tl: 40, tr: 40, bl: 0, br: 0 }); 
               buttonPlayed.strokeRoundedRect(bpx, by, 264, 80, { tl: 40, tr: 40, bl: 0, br: 0 });
          }
          drawScoreButtonActive();
          
          // ranking box
          const rankingBox = this.add.graphics();
          rankingBox.fillStyle(0xFFF6E5);
          rankingBox.lineStyle(5, 0xD35E24); 
          rankingBox.fillRoundedRect(rbx, rby, 624, 768, 40);
          rankingBox.strokeRoundedRect(rbx, rby, 624, 768, 40);
          
          // slot
          const slotNormalFillColor = 0xFFE7BA;
          const slotScoreFillColor = 0x8FEED1;
          const slotPlayedFillColor = 0xFFD338;
          const slotWidth = 576
          const slotHeight = 88;
          const slot = this.add.graphics();
          const garbage: Phaser.GameObjects.GameObject[] = [];
          const clearGarbage = () => {
               garbage.forEach(item => {
                    item.destroy();
               })
          }
          const createSlot = (x: number, y: number, 
               textPrefix: string, textPostfix: string, 
               index: number, isPlayer: boolean) => {
               // slot bg
               if (isPlayer) {
                    if (this.onScorePage) slot.fillStyle(slotScoreFillColor) 
                    else slot.fillStyle(slotPlayedFillColor);
               } else {  
                    slot.fillStyle(slotNormalFillColor);
               }
               slot.fillRoundedRect(x, y, slotWidth, slotHeight, 20);
               // text
               const tpr = this.add.text(x + 96, y + 30, textPrefix, { fontSize: '32px', color: '#57453B' });
               const tpo = this.add.text(x + 376, y + 30, textPostfix, { fontSize: '32px', color: '#57453B' });
               garbage.push(tpr);
               garbage.push(tpo);
               // icon
               if (index == 0) {
                    // rank 1 icon
                    let rank1;
                    if (this.onScorePage) {
                         rank1 = this.add.image(x + 24, y, 'icon', 'icon_badge_gold.png').setOrigin(0, 0);
                    } else {
                         rank1 = this.add.image(x + 24, y+22, 'icon', 'icon_heart_gold.png').setOrigin(0, 0);
                    }
                    garbage.push(rank1);
               } else if (index == 1) {
                    // rank 2 icon
                    let rank2;
                    if (this.onScorePage) {
                         rank2 = this.add.image(x + 24, y, 'icon', 'icon_badge_silver.png').setOrigin(0, 0);
                    } else {
                         rank2 = this.add.image(x + 24, y+22, 'icon', 'icon_heart_silver.png').setOrigin(0, 0);
                    }
                    garbage.push(rank2);
               } else if (index == 2) {
                    // rank 3 icon
                    let rank3;
                    if (this.onScorePage) {
                         rank3 = this.add.image(x + 24, y, 'icon', 'icon_badge_bronze.png').setOrigin(0, 0);
                    } else {
                         rank3 = this.add.image(x + 24, y+22, 'icon', 'icon_heart_bronze.png').setOrigin(0, 0);
                    }
                    garbage.push(rank3);
               } else {
                    // normal icon
                    slot.fillStyle(0xC7BEAF)
                    slot.fillCircle(x + 56, y + 44, 26);
                    slot.lineStyle(3, 0x958E83);
                    slot.strokeCircle(x + 56, y + 44, 26);
               }
               // text in icon
               const tr = this.add.text(x + 45, y + 34, String(index + 1), { fontSize: '28px', color: '#ffffff' });
               if (index == 0) {
                    // rank 1 text
                    tr.setStroke('#E39600', 3);
               } else if (index == 1) {
                    // rank 2 text
                    tr.setStroke('#777777', 3);
               } else if (index == 2) {
                    // rank 3 text
                    tr.setStroke('#E39600', 3);
               } else {
                    // normal text
                    tr.setStroke('#958E83', 3);
               }
               garbage.push(tr);

          }
          const createStackOfSlot = (x: number, y: number) => {
               // clear 
               slot.clear();
               clearGarbage();

               const data = this.onScorePage ? this.dataSortByScore : this.dataSortByPlayed; 
               data.forEach((player, index) => {
                    const textPrefix = player.name;
                    const textPostfix = this.onScorePage ? String(player.score) : String(player.played);
                    const isPlayer = player.id == this.myPlayerID;
                    createSlot(x, y, textPrefix, textPostfix, index, isPlayer);
                    y+= slotHeight + 16;
               })
               
               // my slot rank
               const textPrefix = this.myData.name;
               const textPostfix = this.onScorePage ? String(this.myData.score) : String(this.myData.played);
               const index = data.findIndex(player => player.id == this.myPlayerID);
               createSlot(x, rby + 656, textPrefix, textPostfix, index, true);
               // TODO my rank
          }
          
          // draw slot
          createStackOfSlot(72 , 456);
          
          // event
          // button score
          buttonScore.setInteractive(new Phaser.Geom.Rectangle(bsx, by, 256, 80), Phaser.Geom.Rectangle.Contains);
          buttonScore.on('pointerup', () => {
               console.log('button score click!');
               this.onScorePage = true;
               drawScoreButtonActive();
               createStackOfSlot(72, 456);
               
          });
          // button played
          buttonPlayed.setInteractive(new Phaser.Geom.Rectangle(bpx, by, 256, 80), Phaser.Geom.Rectangle.Contains);
          buttonPlayed.on('pointerup', () => {
               console.log('button played click!');
               this.onScorePage = false;
               drawPlayedButtonActive();
               createStackOfSlot(72, 456);
          });
          
          
          
          
          // // Add a title text
          // this.add.text(400, 50, 'Rankings', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);

          // // Display rankings by score
          // this.dataSortByScore.forEach((player, index) => {
          //      const y = 100 + index * 40;
          //      this.add.text(300, y, `${index + 1}. ${player.name}`, { fontSize: '24px', color: '#fff' });
          //      this.add.text(500, y, `${player.score}`, { fontSize: '24px', color: '#fff' });
          // });

          // // Display rankings by played
          // this.dataSortByPlayed.forEach((player, index) => {
          //      const y = 500 + index * 40;
          //      this.add.text(300, y, `${index + 1}. ${player.name}`, { fontSize: '24px', color: '#fff' });
          //      this.add.text(500, y, `${player.played}`, { fontSize: '24px', color: '#fff' });
          // });

          // this.add.text(0 , 100, `my score: ${this.myData.score}`, { fontSize: '24px', color: '#fff' });
          // this.add.text(0 , 200, `my played: ${this.myData.played}`, { fontSize: '24px', color: '#fff' });


     }    
     

     update() {
          
     }
}