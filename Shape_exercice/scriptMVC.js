
(function () {

    let model = (function () {

        class Point {

            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

        }

        class Shape extends Point {

            constructor(x, y, color) {
                super(x, y);
                this.color = color;
                Shape.arrayList.push(this);
            }

            delete() {
                let myObj = this;

                Shape.arrayList.forEach(function (shape, index) {
                    if (shape === myObj) {
                        Shape.arrayList.splice(index, 1);
                    }
                })

            }
        }

        Shape.arrayList = [];

        class Rectangle extends Shape {

            constructor(width, height, x, y, color) {
                super(x, y, color);
                this.width = width;
                this.height = height;
            }

        }


        class Square extends Rectangle {

            constructor(size, x, y, color) {
                super(size, size, x, y, color);
            }

        }


        class Circle extends Shape {

            constructor(rayon, x, y, color) {
                super(x, y, color);
                this.rayon = rayon;
            }

        }

        let colorList = {
            red: '#bf2101',
            blue: '#116ecd',
            green: '#116e42',
            grey: '#d0d0cc',
            black: '#000000',
            rose: '#f08ab2',
        }


        return {

            getRectangle: function () {
                return new Rectangle(
                    +document.getElementById('recWidth').value,
                    +document.getElementById('recHeight').value,
                    +document.getElementById('posX').value,
                    +document.getElementById('posY').value,
                    colorList[document.querySelector('#color').value]
                )
            },

            getCircle: function () {
                return new Circle(
                    +document.getElementById('radius').value,
                    +document.getElementById('posX').value,
                    +document.getElementById('posY').value,
                    colorList[document.querySelector('#color').value]
                )
            },

            getSquare: function () {
                return new Square(
                    +document.getElementById('squareSize').value,
                    +document.getElementById('posX').value,
                    +document.getElementById('posY').value,
                    colorList[document.querySelector('#color').value]
                )
            },

            getShapeList: function () {
                return Shape.arrayList;
            }
        }

    })();


    let view = (function () {


        let containerList = {
            firstContainer: '#container'
        }

        let formList = {
            rectangle: 'formRectangle',
            circle: 'formCircle',
            square: 'formSquare'
        }

        let buttonList = {
            rectangle: '#validateRectangle',
            circle: '#validateCircle',
            square: '#validateSquare'
        }



        return {

            getButtonList: function () {
                return buttonList;
            },

            displayForm: function (selectedForm) {
                for (let form in formList) {
                    if (form !== selectedForm) {
                        document.getElementById(formList[form]).style.display = 'none';
                    }
                    else {
                        document.getElementById(formList[form]).style.display = 'block';
                    }
                }
            },

            displayPositionInForm: function (evt) {
                document.getElementById('posX').value = evt.offsetX;
                document.getElementById('posY').value = evt.offsetY;
            },


            draw: function () {

                let container = document.querySelector(containerList.firstContainer)
                if (container.getContext) {
                    let ctx = container.getContext('2d');
                    console.log(model.getShapeList())
                    model.getShapeList().forEach(function (form) {
                        if (form.constructor.name == 'Rectangle') {
                            ctx.fillStyle = form.color
                            ctx.fillRect(form.x - Math.round(form.width/2), form.y - Math.round(form.height/2), form.width, form.height);
                        }
                        if (form.constructor.name == 'Circle') {
                            ctx.fillStyle = form.color
                            ctx.beginPath();
                            ctx.arc(form.x, form.y, form.rayon, 0, 2 * Math.PI);
                            ctx.fill()
                            ctx.stroke();
                        }
                        if (form.constructor.name == 'Square') {
                            ctx.fillStyle = form.color
                            ctx.fillRect(form.x - Math.round(form.width/2), form.y - Math.round(form.height/2), form.width, form.height);
                        }
                    })
                }
            }

        }

    })();


    let controller = (function (model, view) {

        let button = view.getButtonList();

        return {
            getPosition: function () {
                document.querySelector('#container').addEventListener('click', function (evt) {
                    view.displayPositionInForm(evt)
                })
            },

            createRectangle: function () {
                document.querySelector(button.rectangle).addEventListener('click', function () {
                    event.preventDefault();
                    model.getRectangle();
                })
            },

            createCircle: function () {
                document.querySelector(button.circle).addEventListener('click', function () {
                    event.preventDefault();
                    model.getCircle();
                })
            },

            createSquare: function () {
                document.querySelector(button.square).addEventListener('click', function () {
                    event.preventDefault();
                    model.getSquare()
                })
            },

            createShape: function () {
                controller.createSquare();
                controller.createRectangle();
                controller.createCircle();
            },

            selectedForm: function () {
                document.querySelector('#shape').addEventListener('change', function (evt) {
                    view.displayForm(evt.target.value);
                })
            },


            init: function () {
                controller.selectedForm();
                controller.getPosition();
                controller.createShape();
                document.querySelectorAll('button').forEach(function (button) {
                    button.addEventListener('click', function (evt) {
                        event.preventDefault();
                        window.onload = view.draw()
                    })
                })
            }


        }
    })(model, view)

    controller.init();
})()