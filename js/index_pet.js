window.addEventListener('DOMContentLoaded', () => {
  // hamburger_menu//
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
  //                         //

  // pagination //

  const button_left = document.querySelector(".pagination_left");
  const button_left_end = document.querySelector(".pagination_left_end");

  const pagination_page_number = document.querySelector(".pagination_page_number");

  const button_right = document.querySelector(".pagination_right");
  const button_right_end = document.querySelector(".pagination_right_end");

  const pagination = document.querySelector(".pagination");
  const item_left = document.querySelector("#pagination_item_left");
  const item_right = document.querySelector("#pagination_item_right");

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

  // функция перемешивания элементов внутри массива //

  function shuffle(array) {
    let l, j, i;
    l = array.length;
    while (l) {
      i = Math.floor(Math.random() * l--);
      j = array[l];
      array[l] = array[i];
      array[i] = j;
    }
    return array;
  }
  //                ///

  // функция заполнения массива на 48 карточек//

  function pagination_start() {
    arr = randomArr(8, 0, 7);
    arr1 = arr.slice(0, 3);
    arr2 = arr.slice(3, 6);
    arr3 = arr.slice(6, 8);
    let arr48 = [];
    let arr11 = [];
    let arr22 = [];
    let arr33 = [];

    //заполняем 6 массивов первой тройки перемешанными карточками первой тройки //
    for (i = 0; i < 6; i++) {
      arr11[i] = [];
      arr11[i] = arr11[i].concat(shuffle(arr1));
    }

    //проверяем созданные карточки на не совпадение первого элемента в карточке , если совпадает мешаем карточку еще раз //
    for (i = 0; i < 5; i++) {
      {
        while (arr11[i][0] == arr11[i + 1][0]) {
          arr11[i + 1] = [];
          arr11[i + 1] = arr11[i + 1].concat(shuffle(arr1));
        }
      }
    }

    for (i = 0; i < 6; i++) {
      arr22[i] = [];
      arr22[i] = arr22[i].concat(shuffle(arr2));
    }
    for (i = 0; i < 5; i++) {
      {
        while (arr22[i][0] == arr22[i + 1][0]) {
          arr22[i + 1] = [];
          arr22[i + 1] = arr22[i + 1].concat(shuffle(arr2));
        }
      }
    }

    for (i = 0; i < 6; i++) {
      arr33[i] = [];
      arr33[i] = arr33[i].concat(shuffle(arr3));
    }
    for (i = 0; i < 5; i++) {
      {
        while (arr33[i][0] == arr33[i + 1][0]) {
          arr33[i + 1] = [];
          arr33[i + 1] = arr33[i + 1].concat(shuffle(arr3));
        }
      }
    }

    // объединяем тройки в общий массив
    for (i = 0; i < 6; i++) {
      arr48 = arr48.concat(arr11[i], arr22[i], arr33[i]);
    }

    return arr48;
  };
  //                                                                  //

  // функция для сбора карточек питомцев на основе id номера         //

  const createCardTemplate = (id) => {

    const card = document.createElement("div");
    card.classList.add("pagination_item");
    card.classList.add("pet_carts_item_pets");
    card.id = pets_info[id].id;

    const img = document.createElement('img');
    img.classList.add('img_pets');
    img.src = `../img/pets/pet-${id}.png`;
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

  let pagination_arr = pagination_start();
  console.log(pagination_arr);

  let arrvivod = pagination_arr.map((_, i, j) => j.slice(i * 8, i * 8 + 8)).filter((el) => el.length);
  console.log(arrvivod);

  // формируем 48 карточек питомцев в соответсвии с номерами из массива созданного функцией pagination_start  //

  let card = [];
  for (let i = 0; i < 48; i++) {
    card[i] = createCardTemplate(pagination_arr[i]);
  }

  let media1280 = window.matchMedia('(min-width: 1000px)');
  media1280.addListener(Destop);
  Destop(media1280);
  function Destop(e) {
    if (e.matches) {
      let page = 1;
      pagination_page_number.innerHTML = `${page}`;
      pagecard(page);

      // вешаем на карточки нужной страницы тег активности //
      function pagecard(page) {

        document.querySelector("#pagination_item_active").innerHTML = '';
        let j = page * 8;
        for (let i = (page - 1) * 8; i < j; i++) {
          document.querySelector("#pagination_item_active").appendChild(card[i]);
        }
      };

      // Задаем первую страницу по умолчанию при загрузке //

      // Реализация переключения страниц //

      button_right.addEventListener("click", () => {
        page = page + 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == 6) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }
      });

      button_right_end.addEventListener("click", () => {
        page = 6;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == 6) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }
      });

      button_left.addEventListener("click", () => {
        page = page - 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == 6) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }

      });

      button_left_end.addEventListener("click", () => {
        page = 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == 6) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }

      });
    }
  }


  const media768 = window.matchMedia('(max-width: 999px) and (min-width: 500px)');

  media768.addListener(Table);
  Table(media768);
  function Table(e) {
    if (e.matches) {
      let page = 1;
      let maxpets = 6;
      let maxpage = 48 / maxpets;
      // функция переключения страниц , вешаем на карточки нужной страницу тег активности //
      function pagecard(page) {

        document.querySelector("#pagination_item_active").innerHTML = '';
        let j = page * maxpets;
        for (let i = (page - 1) * maxpets; i < j; i++) {
          document.querySelector("#pagination_item_active").appendChild(card[i]);
        }
      };
      pagecard(page);
      console.log(page);


      button_right.addEventListener("click", () => {
        page = page + 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == maxpage) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }
      });

      button_right_end.addEventListener("click", () => {
        page = maxpage;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;

        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == maxpage) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }
      });

      button_left.addEventListener("click", () => {
        page = page - 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == maxpage) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }

      });

      button_left_end.addEventListener("click", () => {
        page = 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == maxpage) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }

      });
    }
  }




  const media320 = window.matchMedia('(max-width: 499px)');
  media320.addListener(Mobile);
  Mobile(media320);
  function Mobile(e) {
    if (e.matches) {
      let page = 1;
      let maxpets = 3;
      let maxpage = 48 / maxpets;
      // функция переключения страниц , вешаем на карточки нужной страницу тег активности //
      function pagecard(page) {
        document.querySelector("#pagination_item_active").innerHTML = '';
        let j = page * maxpets;
        for (let i = (page - 1) * maxpets; i < j; i++) {
          document.querySelector("#pagination_item_active").appendChild(card[i]);
        }
      };
      pagecard(page);



      button_right.addEventListener("click", () => {
        page = page + 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
        }


        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == maxpage) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }
      });

      button_right_end.addEventListener("click", () => {
        page = maxpage;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;

        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }


        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == maxpage) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }

      });

      button_left.addEventListener("click", () => {
        page = page - 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }


        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == maxpage) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }

      });

      button_left_end.addEventListener("click", () => {
        page = 1;
        pagecard(page);
        pagination_page_number.innerHTML = `${page}`;
        if (page == 1) {
          button_left.classList.remove('our_friends_buttons_pets_active');
          button_left_end.classList.remove('our_friends_buttons_pets_active');
          button_left.classList.add('our_friends_buttons_pets_no_active');
          button_left_end.classList.add('our_friends_buttons_pets_no_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');

        }

        if (page > 1) {
          button_left.classList.remove('our_friends_buttons_pets_no_active');
          button_left_end.classList.remove('our_friends_buttons_pets_no_active');
          button_left.classList.add('our_friends_buttons_pets_active');
          button_left_end.classList.add('our_friends_buttons_pets_active');
          button_right.classList.remove('our_friends_buttons_pets_no_active');
          button_right_end.classList.remove('our_friends_buttons_pets_no_active');
          button_right.classList.add('our_friends_buttons_pets_active');
          button_right_end.classList.add('our_friends_buttons_pets_active');
        }

        if (page == maxpage) {
          button_right.classList.remove('our_friends_buttons_pets_active');
          button_right_end.classList.remove('our_friends_buttons_pets_active');
          button_right.classList.add('our_friends_buttons_pets_no_active');
          button_right_end.classList.add('our_friends_buttons_pets_no_active');
        }

      });
    }
  }

  // pop-up //

  const pet_card = document.getElementById("pagination_item_active");
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
    if (e.target.parentElement.id == 'pagination_item_active') {
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

    pop_up_image.src = `../img/pets/pet-${id}.png`;
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