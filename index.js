//shows dices
Vue.component('dice-list', {
  props:['dice','id','index'],
  template:`
      <section>
          <dice-holder
            <img :src="AssignDiceImage(id)"
            v-on:click="clickedDice(id)"
            v-bind:class="{ lockedDice: !this.$store.state.diceArray[id].available,
              rotate: rotateDice(id)}"
            ></img>
          </dice-holder>
      </section>
  `,
  methods:{
    //toggles rollclass when appropriate.
    rotateDice: function(id){
      if(this.$store.state.animateDice && this.$store.state.diceArray[id].available){
        this.$store.state.slotRolled[id] = !this.$store.state.slotRolled[id];
      }
        return this.$store.state.slotRolled[id];
    },
    //Assigns dice images.
    AssignDiceImage: function(index){
      switch (this.$store.state.diceArray[index].value){
        case 1:
        return "dice/terning1.svg"
          break;
        case 2:
          return "dice/terning2.svg"
          break;
        case 3:
          return "dice/terning3.svg"
          break;
        case 4:
          return "dice/terning4.svg"
          break;
        case 5:
          return "dice/terning5.svg"
          break;
        case 6:
          return "dice/terning6.svg"
          break;
      }
    },

    //gives store info ab out if dices may be rolled.
    clickedDice:function(id){
      this.$store.state.diceArray[id].available = !this.$store.state.diceArray[id].available;
    }
  }
})

//All different combinations in the game.

Vue.component('combo-list', {
    props: ['title', 'combos'],

    //I initially wanted use a v-for, but Jon explained that in this case working with names instead of array indexes
    //would be more understandable, and that there is no real gain to store everything in arrays and only use indexes.
    template: `
        <section id="allCombinations" :class="{glow: this.$store.state.currentRoll==3}"">
              <div id="ones" class="combo"   v-on:click="clicked('ones')"   v-bind:class="{ free: this.$store.state.combos[0].free }"> Ones:<div>{{pointsOnes}} </div></div>
              <div id="twos" class="combo"   v-on:click="clicked('twos')"   v-bind:class="{ free: this.$store.state.combos[1].free }"> Twos: <div>{{pointsTwos}}</div></div>
              <div id="threes" class="combo" v-on:click="clicked('threes')" v-bind:class="{ free: this.$store.state.combos[2].free }"> Threes: <div>{{pointsThrees}}</div></div>
              <div id="fours" class="combo"  v-on:click="clicked('fours')"  v-bind:class="{ free: this.$store.state.combos[3].free }"> Fours: <div>{{pointsFours}}</div></div>
              <div id="fives" class="combo"  v-on:click="clicked('fives')"  v-bind:class="{ free: this.$store.state.combos[4].free }"> Fives: <div>{{pointsFives}}</div></div>
              <div id="sixes" class="combo"  v-on:click="clicked('sixes')"  v-bind:class="{ free: this.$store.state.combos[5].free }"> Sixes: <div>{{pointsSixes}}</div></div>
              <div id="sum" class="combo"> Top total: <div>{{pointsSum}}</div></div>
              <div id="bonus" class="combo"> Bonus: <div>{{pointsBonus}}</div></div>
              <div id="onePair" class="combo"           v-on:click="clicked('onePair')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'onePair').free }"> Pair: <div>{{pointsPair}}</div></div>
              <div id="twoPairs" class="combo"          v-on:click="clicked('twoPairs')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'twoPairs').free }"> Two Pairs: <div>{{pointsTwoPairs}}</div></div>
              <div id="threeOfAKind" class="combo"      v-on:click="clicked('threeOfAKind')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'threeOfAKind').free }"> Three of a kind: <div>{{pointsThreeOfAKind}}</div></div>
              <div id="fourOfAKind" class="combo"       v-on:click="clicked('fourOfAKind')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'fourOfAKind').free }" > Four of a kind: <div>{{pointsFourOfAKind}}</div></div>
              <div id="yatzy" class="combo"             v-on:click="clicked('yatzy')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'yatzy').free }"> Yatzy(50p): <div>{{pointsYatzy}}</div></div>
              <div id="fullHouse" class="combo"         v-on:click="clicked('fullHouse')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'fullHouse').free }"> Full house: <div>{{pointsFullHouse}}</div></div>
              <div id="smallStraight" class="combo"     v-on:click="clicked('smallStraight')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'smallStraight').free }"> Small straight: <div>{{pointsSmallStraight}}</div></div>
              <div id="largeStraight" class="combo"     v-on:click="clicked('largeStraight')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'largeStraight').free }"> Large straight: <div>{{pointsLargeStraight}}</div></div>
              <div id="chance" class="combo"             v-on:click="clicked('chance')"  v-bind:class="{ free: this.$store.state.combos.find(o => o.name === 'chance').free }"> Chance: <div>{{pointsChance}}</div></div>
              <div id="total" class="combo"> Total: <div>{{pointsTotal}}</div></div>
        </section>
    `,
    methods:{
      //Handles if game over, and if not:
      //reset dice, rolls automatically.
      scoreChosen:function(){
        amount=0;
        for(let i=0;i<18;i++){
          if (this.$store.state.combos[i].free==false){
              amount++
          }
        }
        if (amount==18){
          this.$store.state.used =18;

        } else if(this.$store.state.used< amount){
          this.$store.state.currentRoll=0;
          for (let i=0; i<5;i++){
            this.$store.state.diceArray[i].available=true;
          }
          this.$store.state.used++
          this.$store.commit('roll');
        }
      },

      //locks used combination.
      clicked:function(value){
        this.$store.state.combos.find(o => o.name === value).free =false;
      },

      //Helper function for the first 4 combinations.
      regularDice: function(reqValue) {
        if(this.$store.state.combos[reqValue-1].free){
          var amount= 0;
          for (let i=0; i<5; i++){
            if (this.$store.state.diceArray[i].value==reqValue){
              amount++;
            }
          }
          this.$store.state.combos[reqValue-1].sum = amount*reqValue;
        }
        return this.$store.state.combos[reqValue-1].sum;
      },
      //Helper function with multipurpose for some more advanced combinations.
      multipleOfSame:function(reqAmount, maxValue){
          var amount =0;
          //value
          for (let i=maxValue; i>0; i--){
            //dice
            for (let a=0; a<5; a++){
              if (this.$store.state.diceArray[a].value== i){
                amount ++;
                if(amount == reqAmount){
                  //  this.$store.state.combos[reqAmount+6].sum = i*reqAmount;
                    return i*reqAmount;
                }
              }
            }
            amount=0;
          }
          return 0;
      }
    },

    //unlocks all dice.
    newTurn:function(){
      for (let i=0;i<5;i++){
        this.$store.diceArray[i].available=true;
      }
    },

    //handles outprints of scores as well as setting scores in store.
    computed: {
        pointsOnes:function(){this.scoreChosen(); return this.regularDice(1);},
        pointsTwos:function(){this.scoreChosen();return this.regularDice(2);},
        pointsThrees:function(){this.scoreChosen();return this.regularDice(3);},
        pointsFours:function(){this.scoreChosen();return this.regularDice(4);},
        pointsFives:function(){this.scoreChosen();return this.regularDice(5);},
        pointsSixes:function(){this.scoreChosen();return this.regularDice(6);},
        pointsSum:function(){
          value = 0;
          for (let i=0; i<6; i++){
            if (!this.$store.state.combos[i].free){
              value +=this.$store.state.combos[i].sum;}
          }
          this.$store.state.combos.find(o => o.name === "sum").sum = value;
          return value;
        },
        pointsBonus:function(){
          amount = 0;
          if (this.$store.state.combos.find(o => o.name === "sum").sum >62){
            amount=50;
            this.$store.state.combos.find(o => o.name === "bonus").sum = amount;
          }
          return amount;
        },
        pointsPair:function(){
          this.scoreChosen();
          if(this.$store.state.combos.find(o => o.name === "onePair").free){
            value=0;
            value=this.multipleOfSame(2,6);
            this.$store.state.combos[8].sum = value
        }
        return  this.$store.state.combos[8].sum;
        },
        pointsTwoPairs:function(){
          this.scoreChosen();
          if(this.$store.state.combos.find(o => o.name === "twoPairs").free){
          firstMatch= this.multipleOfSame(2,6);
          secondMatch= this.multipleOfSame(2, firstMatch/2-1);
          this.$store.state.combos.find(o => o.name === "twoPairs")
          if (secondMatch>0){
            value = firstMatch+secondMatch;
            this.$store.state.combos.find(o => o.name === "twoPairs").sum = value;
            return value;
          }
          value=0;
          this.$store.state.combos.find(o => o.name === "twoPairs").sum = value;
          return value;
        }
        return this.$store.state.combos.find(o => o.name === "twoPairs").sum;
        },
        pointsThreeOfAKind:function(){
          this.scoreChosen();
          if(this.$store.state.combos.find(o => o.name === "threeOfAKind").free){
            value = this.multipleOfSame(3,6);
            this.$store.state.combos.find(o => o.name === "threeOfAKind").sum = value;
        }
        return this.$store.state.combos.find(o => o.name === "threeOfAKind").sum;
        },
        pointsFourOfAKind:function(){
          this.scoreChosen();
          if(this.$store.state.combos.find(o => o.name === "fourOfAKind").free){
            value = this.multipleOfSame(4,6);
            this.$store.state.combos.find(o => o.name === "fourOfAKind").sum = value;
          }
          return this.$store.state.combos.find(o => o.name === "fourOfAKind").sum;
        },
        pointsYatzy:function(){
          this.scoreChosen();
            if(this.$store.state.combos.find(o => o.name === "yatzy").free){
              if(this.multipleOfSame(5,6)>0){
                value =50;
                this.$store.state.combos.find(o => o.name === "yatzy").sum = value;
                return value;
              }
              value =0;
              this.$store.state.combos.find(o => o.name === "yatzy").sum = value;
          }
          return this.$store.state.combos.find(o => o.name === "yatzy").sum;
        },
        pointsFullHouse:function(){
          this.scoreChosen();
          if(this.$store.state.combos.find(o => o.name === "fullHouse").free){
            firstMatch = this.multipleOfSame(3,6);
            secondMatch= this.multipleOfSame(2, 6);
              if (firstMatch==secondMatch){
                secondMatch= this.multipleOfSame(2, firstMatch-1);
              }
            if (firstMatch >0 && secondMatch > 0 ){
              value= firstMatch+secondMatch;
              this.$store.state.combos.find(o => o.name === "fullHouse").sum = value;
              return value;
            }
            value= 0;
            this.$store.state.combos.find(o => o.name === "fullHouse").sum = value;
            return value;
          }
          return this.$store.state.combos.find(o => o.name === "fullHouse").sum;
        },
        pointsTotal: function() {
          amount=0;
          for (let i=6; i<16;i++){
            if (this.$store.state.combos[i].free==false){
              amount += this.$store.state.combos[i].sum;
              this.$store.state.combos.find(o => o.name ==="total").sum = amount;
            }
          }
          return amount;
        },
        pointsSmallStraight:function(){
          this.scoreChosen();
          if(this.$store.state.combos.find(o => o.name === "smallStraight").free){
            for(let i=0;i<5;i++){
              if(this.$store.state.diceArray[i].value != i+1){
                value= 0;
                this.$store.state.combos.find(o => o.name === "smallStraight").sum = value;
                return this.$store.state.combos.find(o => o.name === "smallStraight").sum;
              }
            }
            value = 15;
            this.$store.state.combos.find(o => o.name === "smallStraight").sum = value;
          }
          return this.$store.state.combos.find(o => o.name === "smallStraight").sum;
        },
        pointsLargeStraight:function(){
          this.scoreChosen();
            if(this.$store.state.combos.find(o => o.name === "largeStraight").free){
              for(let i=0;i<5;i++){
                if(this.$store.state.diceArray[i].value != i+2){
                  value=0;
                  this.$store.state.combos.find(o => o.name === "largeStraight").sum = value;
                  return this.$store.state.combos.find(o => o.name === "largeStraight").sum;
                }
              }
              value=20;
              this.$store.state.combos.find(o => o.name === "largeStraight").sum = value;
            }
            return this.$store.state.combos.find(o => o.name === "largeStraight").sum
        },
        pointsChance:function(){
          this.scoreChosen();
            if(this.$store.state.combos.find(o => o.name === "chance").free){
              value=0;
              for (let i=0;i<5;i++){
                value += this.$store.state.diceArray[i].value;
              }
              this.$store.state.combos.find(o => o.name === "chance").sum = value;
            }
          return   this.$store.state.combos.find(o => o.name === "chance").sum;
        }
    }
})


//Stores all data about dices and combinations.
const store = new Vuex.Store({
  state: {
    //how many combos are locked.
    used:3,
    //how many rolls used on this turn.
    currentRoll:0,
    //Makes sure dice only animate rolling when intended.
    animateDice:false,
    //class toggling for animations are based on this.
    //locked for positions.
    slotRolled:[
      false,
      false,
      false,
      false,
      false
    ],
    //Storage for dice information. saved id is used for identifying so dices
    // can move in game between arrayslots.
    diceArray: [
      {
        id:0,
        value:Math.floor(Math.random() * (+7 - +1)) + +1,
        available:true,
        rolled:false
      },
      {
        id:1,
        value:Math.floor(Math.random() * (+7 - +1)) + +1,
        available:true,
        rolled: false

      },
      {
        id:2,
        value:Math.floor(Math.random() * (+7 - +1)) + +1,
        available:true,
        rolled:false
      },
      {
        id:3,
        value:Math.floor(Math.random() * (+7 - +1)) + +1,
        available:true,
        rolled:false
      },
      {
        id:4,
        value:Math.floor(Math.random() * (+7 - +1)) + +1,
        available:true,
        rolled:false
      }
    ],

    //The data for combinations.
    combos:
    [
      {
        name:"ones",
        sum:0,
        free:true
      },
      {
        name:"twos",
        sum:0,
        free:true
      },
      {
        name:"threes",
        sum:0,
        free:true
      },
      {
        name:"fours",
        sum:0,
        free:true
      },
      {
        name:"fives",
        sum:0,
        free:true
      },
      {
        name:"sixes",
        sum:0,
        free:true
      },
      {
        name:"sum",
        sum:0,
        free:false
      },
      {
        name:"bonus",
        sum:0,
        free:false
      },
      {
        name:"onePair",
        sum:0,
        free:true
      },
      {
        name:"threeOfAKind",
        sum:0,
        free:true
      },
      {
        name:"fourOfAKind",
        sum:0,
        free:true
      },
      {
        name:"yatzy",
        sum:0,
        free:true
      },
      {
        name:"twoPairs",
        sum:0,
        free:true
      },
      {
        name:"fullHouse",
        sum:0,
        free:true
      },
      {
        name:"chance",
        sum:0,
        free:true
      },
      {
        name:"smallStraight",
        sum:0,
        free:true
      },
      {
        name:"largeStraight",
        sum:0,
        free:true
      },
      {
        name:"total",
        sum:0,
        free:false
      }
  ]
  },
  mutations: {
    //randomises dice value, sorts dice, initalizes chain to dice animation.
    roll (state) {
      if(state.used==18){
        state.currentRoll=0;
      }
      if (state.currentRoll <3){
        state.currentRoll++;
        state.diceArray.forEach(function(element) {
          if(element.available==true){
            element.value = Math.floor(Math.random() * (+7 - +1)) + +1;
          }
        });
      state.diceArray.sort((a, b) => (a.value > b.value) ? 1 : -1)

      state.animateDice=true;
      state.diceArray.forEach(function(element) {
        if(element.available==true){
          element.rolled = !element.rolled;
        }
      });
      setTimeout(function(){
        state.animateDice=false;
      }, 200);
      }
    }
  }
})
const app = new Vue({
    store:store,
    el: "#app",

    created(){
      store.commit('roll'),
      document.addEventListener("keyup", function (event){
        console.log(event.which-49);
        if(event.which>48 && event.which<54){
          store.state.diceArray[event.which-49].available = !store.state.diceArray[event.which-49].available;
        }
      })
    }
})
