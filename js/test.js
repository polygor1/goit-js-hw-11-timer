class Test {
  constructor() {
    this.number = 3;
  }

  test() {
    function getFirstThis() {
       return this;
    }

    const getSecondThis = () => {
       return this;
    };

    const getThirdThis = getFirstThis.bind(this);
    
    const $this = this;
    function getFourthThis() {
      return $this;
    }

    // undefined
    console.log(getFirstThis());
    
    // All return "this" context, containing the number property
    console.log('this', this); 
    console.log('2', getSecondThis());
    // console.log('3', getThirdThis());
    // console.log('4', getFourthThis());
  }
}

const testy = new Test();

testy.test()




