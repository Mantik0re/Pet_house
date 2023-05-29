window.addEventListener('DOMContentLoaded', () => {


  // hamburger_menu start //
  const hamburger_menu = document.querySelector(".hamburger_menu");
  const nav = document.querySelector(".nav");
  const teni = document.querySelector(".teni");
  const body = document.querySelector("body");
  const nav_item = document.querySelectorAll(".nav-item");
  const nav_item_pets = document.querySelectorAll(".nav-item_pets");

  hamburger_menu.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      close_hamburger();
    } else {
      open_hamburger();
    }
  });

  teni.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      close_hamburger();
    } else {
      open_hamburger();
    }
  });


  nav_item.forEach((i) => {
    i.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        close_hamburger();
      } else {
        open_hamburger();
      }
    });
  });


  nav_item_pets.forEach((i) => {
    i.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        close_hamburger();
      } else {
        open_hamburger();
      }
    });
  });

  const open_hamburger = () => {
    nav.classList.add("active");
    teni.classList.add("active");
    body.classList.add("noscroll");

    hamburger_menu.querySelectorAll("span").forEach((line, i) => {
      if (i == 0) {
        line.style.transform = "translateX(10px) translateY(10px) rotate(90deg)";
      }
      if (i == 1) {
        line.style.transform = " rotate(90deg)";
      }
      if (i == 2) {
        line.style.transform = "translateX(-10px) translateY(-10px) rotate(90deg)";
      }

    });
  };

  const close_hamburger = () => {
    setTimeout(() => {
      nav.classList.remove("active");
      teni.classList.remove("active");
      body.classList.remove("noscroll");
    },);

    hamburger_menu.querySelectorAll("span").forEach((line) => {
      line.style.transform = "";

    });
  };
  // hamburger_menu end //


  // курусель начало//

  const button_left = document.querySelector(".pet_carts_left_button");
  const button_right = document.querySelector(".pet_carts_right_button");
  const carusel = document.querySelector(".carusel");
  const item_left = document.querySelector("#item-left");
  const item_right = document.querySelector("#item-right");



  // функция для заполнения массива рэндомом //
  function randomArr(num, min, max) {
    let arr = [];
    while (arr.length < num) {
      let e = Math.floor(min + Math.random() * (max + 1 - min));
      if (arr.indexOf(e) === -1) arr.push(e);
    }
    return arr;
  }
  //                ///

  // функция для стартового заполнения массивов карточек//

  function carusel_start() {
    let activeArr = [],
      leftArr = [],
      rightArr = [];

    rightArr = randomArr(3, 0, 7);
    activeArr = activeArr.concat(rightArr);
    while ((rightArr.filter(element => activeArr.includes(element))).length != 0) {
      rightArr = randomArr(3, 0, 7);
    }
    leftArr = leftArr.concat(activeArr);
    activeArr = [];
    activeArr = activeArr.concat(rightArr);
    while ((rightArr.filter(element => activeArr.includes(element))).length != 0) {
      rightArr = randomArr(3, 0, 7);
    }
    return {
      activeArr: activeArr,
      leftArr: leftArr,
      rightArr: rightArr,
    };
  }

  ///                                           ///
  //функция заполнения карточек питомцев //
  const createCardTemplate = (id) => {

    const card = document.createElement("div");
    card.classList.add("pet_carts_item");
    card.id = pets_info[id].id;

    const img = document.createElement('img');
    img.classList.add('img_pets');
    img.src = `/img/pets/pet-${id}.png`;
    img.alt = `${pets_info[id].name}`;
    card.appendChild(img);

    const pets_name = document.createElement('div');
    pets_name.innerHTML = pets_info[id].name;
    card.appendChild(pets_name);

    const pet_carts_button = document.createElement('div');
    pet_carts_button.classList.add('pet_carts_button');
    pet_carts_button.id = pets_info[id].id;
    pet_carts_button.innerHTML = 'Learn more';
    card.appendChild(pet_carts_button);

    return card;
  }


  ///                                     ///

  // // карусель на разрешении 1280//
  const media1280 = window.matchMedia('(min-width: 1279px)');
  media1280.addListener(Destop);
  Destop(media1280);
  function Destop(e) {

    // формируем начальные блоки по 3 карточки питомцев в соответсвии с номерами из массива созданного функцией carusel_start  //

    let start_arr = carusel_start();

    document.querySelector("#item-active").innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate(start_arr.activeArr[i]);
      document.querySelector("#item-active").appendChild(card);
    }
    document.querySelector("#item-left").innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate(start_arr.leftArr[i]);
      document.querySelector("#item-left").appendChild(card);
    }

    document.querySelector("#item-right").innerHTML = '';
    for (let i = 0; i < 3; i++) {
      const card = createCardTemplate(start_arr.rightArr[i]);
      document.querySelector("#item-right").appendChild(card);
    }

    //                                                       ///

    const move_left = () => {
      carusel.classList.add("transition-carusel-left");
      button_left.removeEventListener("click", move_left);
      button_right.removeEventListener("click", move_right);
    }

    const move_right = () => {
      carusel.classList.add("transition-carusel-right");
      button_right.removeEventListener("click", move_right);
      button_left.removeEventListener("click", move_left);
    }

    button_left.addEventListener("click", move_left);
    button_right.addEventListener("click", move_right);


    // функция заполнения массивов при нажатии кнопки вправо  //   
    //
    function carusel_right() {
      let activeArr = [],
        leftArr = [],
        rightArr = [];

      leftArr = leftArr.concat(start_arr.activeArr);
      activeArr = activeArr.concat(start_arr.rightArr);
      rightArr = rightArr.concat(start_arr.rightArr);
      while ((rightArr.filter(element => activeArr.includes(element))).length != 0) {
        rightArr = randomArr(3, 0, 7);
      }

      return {
        activeArr: activeArr,
        leftArr: leftArr,
        rightArr: rightArr,
      };
    };


    // функция заполнения массивов при нажатии кнопки влево  //

    function carusel_left() {
      let activeArr = [],
        leftArr = [],
        rightArr = [];

      rightArr = rightArr.concat(start_arr.activeArr);
      activeArr = activeArr.concat(start_arr.leftArr);
      leftArr = leftArr.concat(start_arr.leftArr);
      while ((leftArr.filter(element => activeArr.includes(element))).length != 0) {
        leftArr = randomArr(3, 0, 7);
      }

      return {
        activeArr: activeArr,
        leftArr: leftArr,
        rightArr: rightArr,
      };
    };



    carusel.addEventListener("animationend", (animation) => {

      if (animation.animationName === "carusel-left") {
        start_arr = carusel_left();
        carusel.classList.remove("transition-carusel-left");

        document.querySelector("#item-active").innerHTML = '';
        for (let i = 0; i < 3; i++) {
          const card = createCardTemplate(start_arr.activeArr[i]);
          document.querySelector("#item-active").appendChild(card);
        }
        document.querySelector("#item-left").innerHTML = '';
        for (let i = 0; i < 3; i++) {
          const card = createCardTemplate(start_arr.leftArr[i]);
          document.querySelector("#item-left").appendChild(card);
        }
        document.querySelector("#item-right").innerHTML = '';
        for (let i = 0; i < 3; i++) {
          const card = createCardTemplate(start_arr.rightArr[i]);
          document.querySelector("#item-right").appendChild(card);
        }

      }

      if (animation.animationName === "carusel-right") {
        start_arr = carusel_right();
        carusel.classList.remove("transition-carusel-right");

        document.querySelector("#item-active").innerHTML = '';
        for (let i = 0; i < 3; i++) {
          const card = createCardTemplate(start_arr.activeArr[i]);
          document.querySelector("#item-active").appendChild(card);
        }
        document.querySelector("#item-left").innerHTML = '';
        for (let i = 0; i < 3; i++) {
          const card = createCardTemplate(start_arr.leftArr[i]);
          document.querySelector("#item-left").appendChild(card);
        }
        document.querySelector("#item-right").innerHTML = '';
        for (let i = 0; i < 3; i++) {
          const card = createCardTemplate(start_arr.rightArr[i]);
          document.querySelector("#item-right").appendChild(card);
        }
      }


      button_right.addEventListener("click", move_right);
      button_left.addEventListener("click", move_left);

    });
  }




  // карусель на разрешении 768 //
  const media768 = window.matchMedia('(max-width: 1278px) and (min-width: 768px)');
  media768.addListener(Table);
  Table(media768);
  function Table(e) {
    if (e.matches) {
      // формируем начальные блоки по 2 карточки питомцев в соответсвии с номерами из массива созданного функцией carusel_start  //

      let start_arr = carusel_start();

      document.querySelector("#item-active").innerHTML = '';
      for (let i = 0; i < 2; i++) {
        const card = createCardTemplate(start_arr.activeArr[i]);
        document.querySelector("#item-active").appendChild(card);
      }
      document.querySelector("#item-left").innerHTML = '';
      for (let i = 0; i < 2; i++) {
        const card = createCardTemplate(start_arr.leftArr[i]);
        document.querySelector("#item-left").appendChild(card);
      }

      document.querySelector("#item-right").innerHTML = '';
      for (let i = 0; i < 2; i++) {
        const card = createCardTemplate(start_arr.rightArr[i]);
        document.querySelector("#item-right").appendChild(card);
      }

      //                                                       ///

      const move_left = () => {
        carusel.classList.add("transition-carusel-left");
        button_left.removeEventListener("click", move_left);
        button_right.removeEventListener("click", move_right);
      }

      const move_right = () => {
        carusel.classList.add("transition-carusel-right");
        button_right.removeEventListener("click", move_right);
        button_left.removeEventListener("click", move_left);
      }

      button_left.addEventListener("click", move_left);
      button_right.addEventListener("click", move_right);


      // функция заполнения массивов при нажатии кнопки вправо  //                                                          //
      function carusel_right() {
        let activeArr = [],
          leftArr = [],
          rightArr = [];

        leftArr = leftArr.concat(start_arr.activeArr);
        activeArr = activeArr.concat(start_arr.rightArr);
        rightArr = rightArr.concat(start_arr.rightArr);
        while ((rightArr.filter(element => activeArr.includes(element))).length != 0) {
          rightArr = randomArr(3, 0, 7);
        }

        return {
          activeArr: activeArr,
          leftArr: leftArr,
          rightArr: rightArr,
        };
      };


      // функция заполнения массивов при нажатии кнопки влево  //  
      function carusel_left() {
        let activeArr = [],
          leftArr = [],
          rightArr = [];

        rightArr = rightArr.concat(start_arr.activeArr);
        activeArr = activeArr.concat(start_arr.leftArr);
        leftArr = leftArr.concat(start_arr.leftArr);
        while ((leftArr.filter(element => activeArr.includes(element))).length != 0) {
          leftArr = randomArr(3, 0, 7);
        }

        return {
          activeArr: activeArr,
          leftArr: leftArr,
          rightArr: rightArr,
        };
      };



      carusel.addEventListener("animationend", (animation) => {

        if (animation.animationName === "carusel-left") {
          start_arr = carusel_left();
          carusel.classList.remove("transition-carusel-left");

          document.querySelector("#item-active").innerHTML = '';
          for (let i = 0; i < 2; i++) {
            const card = createCardTemplate(start_arr.activeArr[i]);
            document.querySelector("#item-active").appendChild(card);
          }
          document.querySelector("#item-left").innerHTML = '';
          for (let i = 0; i < 2; i++) {
            const card = createCardTemplate(start_arr.leftArr[i]);
            document.querySelector("#item-left").appendChild(card);
          }
          document.querySelector("#item-right").innerHTML = '';
          for (let i = 0; i < 2; i++) {
            const card = createCardTemplate(start_arr.rightArr[i]);
            document.querySelector("#item-right").appendChild(card);
          }

        }

        if (animation.animationName === "carusel-right") {
          start_arr = carusel_right();
          carusel.classList.remove("transition-carusel-right");

          document.querySelector("#item-active").innerHTML = '';
          for (let i = 0; i < 2; i++) {
            const card = createCardTemplate(start_arr.activeArr[i]);
            document.querySelector("#item-active").appendChild(card);
          }
          document.querySelector("#item-left").innerHTML = '';
          for (let i = 0; i < 2; i++) {
            const card = createCardTemplate(start_arr.leftArr[i]);
            document.querySelector("#item-left").appendChild(card);
          }
          document.querySelector("#item-right").innerHTML = '';
          for (let i = 0; i < 2; i++) {
            const card = createCardTemplate(start_arr.rightArr[i]);
            document.querySelector("#item-right").appendChild(card);
          }
        }


        button_right.addEventListener("click", move_right);
        button_left.addEventListener("click", move_left);



      });

    }
  }

  // карусель на разрешении 320 //
  const media320 = window.matchMedia('(max-width: 767px)');
  media320.addListener(Mobile);
  Mobile(media320);
  function Mobile(e) {
    if (e.matches) {
      // формируем начальные блок по 1 карточке питомцев в соответсвии с номерами из массива созданного функцией carusel_start  //

      let start_arr = carusel_start();

      document.querySelector("#item-active").innerHTML = '';
      for (let i = 0; i < 1; i++) {
        const card = createCardTemplate(start_arr.activeArr[i]);
        document.querySelector("#item-active").appendChild(card);
      }
      document.querySelector("#item-left").innerHTML = '';
      for (let i = 0; i < 1; i++) {
        const card = createCardTemplate(start_arr.leftArr[i]);
        document.querySelector("#item-left").appendChild(card);
      }

      document.querySelector("#item-right").innerHTML = '';
      for (let i = 0; i < 1; i++) {
        const card = createCardTemplate(start_arr.rightArr[i]);
        document.querySelector("#item-right").appendChild(card);
      }

      //                                                       ///

      const move_left = () => {
        carusel.classList.add("transition-carusel-left");
        button_left.removeEventListener("click", move_left);
        button_right.removeEventListener("click", move_right);
      }

      const move_right = () => {
        carusel.classList.add("transition-carusel-right");
        button_right.removeEventListener("click", move_right);
        button_left.removeEventListener("click", move_left);
      }

      button_left.addEventListener("click", move_left);
      button_right.addEventListener("click", move_right);


      // функция заполнения массивов при нажатии кнопки вправо  //                                                          //
      function carusel_right() {
        let activeArr = [],
          leftArr = [],
          rightArr = [];

        leftArr = leftArr.concat(start_arr.activeArr);
        activeArr = activeArr.concat(start_arr.rightArr);
        rightArr = rightArr.concat(start_arr.rightArr);
        while ((rightArr.filter(element => activeArr.includes(element))).length != 0) {
          rightArr = randomArr(3, 0, 7);
        }

        return {
          activeArr: activeArr,
          leftArr: leftArr,
          rightArr: rightArr,
        };
      };


      // функция заполнения массивов при нажатии кнопки влево  //  
      function carusel_left() {
        let activeArr = [],
          leftArr = [],
          rightArr = [];

        rightArr = rightArr.concat(start_arr.activeArr);
        activeArr = activeArr.concat(start_arr.leftArr);
        leftArr = leftArr.concat(start_arr.leftArr);
        while ((leftArr.filter(element => activeArr.includes(element))).length != 0) {
          leftArr = randomArr(3, 0, 7);
        }

        return {
          activeArr: activeArr,
          leftArr: leftArr,
          rightArr: rightArr,
        };
      };


      carusel.addEventListener("animationend", (animation) => {

        if (animation.animationName === "carusel-left") {
          start_arr = carusel_left();
          carusel.classList.remove("transition-carusel-left");

          document.querySelector("#item-active").innerHTML = '';
          for (let i = 0; i < 1; i++) {
            const card = createCardTemplate(start_arr.activeArr[i]);
            document.querySelector("#item-active").appendChild(card);
          }
          document.querySelector("#item-left").innerHTML = '';
          for (let i = 0; i < 1; i++) {
            const card = createCardTemplate(start_arr.leftArr[i]);
            document.querySelector("#item-left").appendChild(card);
          }
          document.querySelector("#item-right").innerHTML = '';
          for (let i = 0; i < 1; i++) {
            const card = createCardTemplate(start_arr.rightArr[i]);
            document.querySelector("#item-right").appendChild(card);
          }

        }

        if (animation.animationName === "carusel-right") {
          start_arr = carusel_right();
          carusel.classList.remove("transition-carusel-right");

          document.querySelector("#item-active").innerHTML = '';
          for (let i = 0; i < 1; i++) {
            const card = createCardTemplate(start_arr.activeArr[i]);
            document.querySelector("#item-active").appendChild(card);
          }
          document.querySelector("#item-left").innerHTML = '';
          for (let i = 0; i < 1; i++) {
            const card = createCardTemplate(start_arr.leftArr[i]);
            document.querySelector("#item-left").appendChild(card);
          }
          document.querySelector("#item-right").innerHTML = '';
          for (let i = 0; i < 1; i++) {
            const card = createCardTemplate(start_arr.rightArr[i]);
            document.querySelector("#item-right").appendChild(card);
          }
        }

        button_right.addEventListener("click", move_right);
        button_left.addEventListener("click", move_left);


      });
    }
  }

  // карусель конец //

  // pop-up //

  const pet_card = document.getElementById("item-active");
  const pop_up_image = document.querySelector('.pop_up_image');
  const pop_up_name = document.querySelector('.pop_up_name');
  const pop_up_type = document.querySelector('.pop_up_type');
  const pop_up_description = document.querySelector('.pop_up_description');
  const pop_up_age = document.querySelector('.pop_up_age');
  const pop_up__inoculations = document.querySelector('.pop_up_inoculations');
  const pop_up_diseases = document.querySelector('.pop_up_diseases');
  const pop_up_parasites = document.querySelector('.pop_up_parasites');
  const pop_up_wrapper = document.querySelector('.pop_up_wrapper');
  const pop_up_fix = document.querySelector('.pop_up_fix');
  const pop_up = document.querySelector('.pop_up');



  pet_card.addEventListener('click', pets_id)


  function pets_id(e) {
    if (e.target.parentElement.id == 'item-active') {
      id = (e.target.id);
    } else {
      id = (e.target.parentElement.id);
    }
    CreatePetcard_popup(id);
  }


  function CreatePetcard_popup(id) {

    pop_up_fix.classList.add('pop_up_overlay');
    document.body.classList.add('noscroll');
    pop_up_wrapper.classList.add('pop_up_open');
    pop_up.style.display = 'flex';

    pop_up_image.src = `/img/pets/pet-${id}.png`;
    pop_up_image.alt = `${pets_info[id].name}`;
    pop_up_name.innerHTML = pets_info[id].name;
    pop_up_type.innerHTML = `${pets_info[id].type} - ${pets_info[id].breed}`;
    pop_up_description.innerHTML = pets_info[id].description;
    pop_up_age.innerHTML = `${pets_info[id].age}`;
    pop_up__inoculations.innerHTML = `${pets_info[id].inoculations}`;
    pop_up_diseases.innerHTML = ` ${pets_info[id].diseases}`;
    pop_up_parasites.innerHTML = ` ${pets_info[id].parasites}`;
  }


  pop_up_fix.addEventListener('click', pop_up_close)

  function pop_up_close(e) {
    if (e.target.classList.contains('pop_up_overlay') || e.target.classList.contains('pop_up_button') || e.target.classList.contains('pop_up')) {
      pop_up_fix.classList.remove('pop_up_overlay');
      pop_up_wrapper.classList.remove('pop_up_open')
      pop_up.style.display = 'none';
      document.body.classList.remove('noscroll');
    }
  }

  // pop-up конец //
});