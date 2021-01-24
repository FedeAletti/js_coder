$(document).ready(function () {

    // -------------------------------------------------------- AJAX cambio de personas de testimonial
    $.ajax({
        url: 'https://randomuser.me/api/?results=1',
        dataType: 'json',
        success: function(data) {
            imprimirPersona(data.results);
            return
        }
    });

    function imprimirPersona(data){
        data.forEach((usuario) => {
            // console.log(usuario);
            const card = document.createElement("li");

            const {
                name: {first},
                name: {last},
                picture: {medium},
                location: {city},
                dob: {age}
            } = usuario;

            card.innerHTML = `
                <div class="col-3"><img src="${medium}" alt=""></div>
                <div class="col-9 card-servicio-info">
                    <p>Gracias al seguro de mi bicicleta pude seguir haciendo mis recorridos diarios sin problemas y sin miedos!</p>
                    <h4>${first} ${last}</h4>
                    <h6 class="text-muted">- ${city}, ${age}</h6>
                </div>
            `

            document.querySelector(".card-testimonial").appendChild(card)
        })
    }


    // -------------------------------------------------------- Aparición de distintos paneles
    $('#flip').click(function(){
        $('#cotizador').removeClass('shadow');
        $('#panel').slideDown(2500);

        
        $('#continue1').on('click', function(e){
            e.preventDefault();
            $('#modalCotizador').fadeOut(1500, function () {
                $('#modalCotizador').remove()
                $('#panel2').fadeIn(1000)
            })
        })
        $('#continue2').on('click', function(e){
            e.preventDefault();
            $('#modalCotizador2').fadeOut(1500, function () {
                $('#modalCotizador2').remove();
                $('#panel3').fadeIn(1000)
            })
        })
    });

    // -------------------------------------------------------- Aparición de planes
    $('#planNext').on('click', function(e) {
        e.preventDefault();
        if ($('#planes').hasClass('plan1')){
            $('#planes').removeClass('plan1');
            $('.plan-nombre').html('Plan Medio');
            $('.plan-precio').html('$500');
            $('#planes').addClass('plan2')

            //-----------Prestaciones
            $('#prestaciones li').remove();
            $('#prestaciones').append(
                `
                <li class="item-li-1"><i class="fas fa-check-double"></i> Robo</li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Destrucción e Incendio</li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Transporte en caso de accidente   </li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Servicio Técnico   </li>

                `
            )

        } else if ($('#planes').hasClass('plan2')){
            $('#planes').removeClass('plan2');
            $('.plan-nombre').html('Plan Premium');
            $('.plan-precio').html('$800');
            $('#planes').addClass('plan3')

            //-----------Prestaciones
            $('#prestaciones li').remove();
            $('#prestaciones').append(
                `
                <li class="item-li-1"><i class="fas fa-check-double"></i> Robo</li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Destrucción e Incendio</li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Transporte en caso de accidente   </li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Servicio Técnico   </li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Cambio de componentes por avería   </li>
                `
            )


        } else if ($('#planes').hasClass('plan3')){
            $('#planes').removeClass('plan3');
            $('.plan-nombre').html('Plan Básico');
            $('.plan-precio').html('$250');
            $('#planes').addClass('plan1')

            //-----------Prestaciones
            $('#prestaciones li').remove();
            $('#prestaciones').append(
                `
                <li class="item-li-1"><i class="fas fa-check-double"></i> Robo</li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Destrucción e Incendio</li>
                <li class="item-li-1"><i class="fas fa-check-double"></i> Transporte en caso de accidente   </li>
                `
            )

        }
    })

    // ---------------------------------------------------------------- OBTENER DATOS

        $("#continue1").on('click', function() {

            biciCliente = {
                modelo: $('#biciTipo').val(),
                marca: $('#biciMarca').val(),
                precio: $('#biciPrecio').val()
            }

            return;
        })
        $("#continue2").on('click', function() {
            // console.log(biciCliente)
            datosCliente = {
                nombre: $('.nombre').val(),
                apellido: $('.apellido').val(),
                telefono: $('.telefono').val(),
                correo: $('.correo').val()
            }

            // console.log(`El cliente ${datosCliente.nombre} ${datosCliente.apellido}, su telefono es ${datosCliente.telefono} y su correo ${datosCliente.correo}`)
            return;
        })
        $("#finCotizacion").on('click', function() {

            //----Datos del plan elegido
            planElegido = {
                nombre: $('.plan-nombre').text(),
                precio: $('.plan-precio').text()
            };
            
            console.log(`El cliente se llama ${datosCliente.nombre + ' ' + datosCliente.apellido},su teléfono es ${datosCliente.telefono}. Posee una bicicleta de tipo ${biciCliente.modelo} de la marca ${biciCliente.marca} que cuesta alrededor de $${biciCliente.precio}. Ha escogido el ${planElegido.nombre} de un valor de ${planElegido.precio}.`)

            $('#finCotizacion').attr('href', `https://api.whatsapp.com/send?phone=543424388638&text=Hola!%20Soy%20${datosCliente.nombre}.%20Poseo%20una%20bicicleta%20de%20tipo%20${biciCliente.modelo}%20de%20la%20marca%20${biciCliente.marca}%20valuada%20alrededor%20de%20los%20AR%24${biciCliente.precio}.%20He%20escogido%20el%20${planElegido.nombre}%20de%20un%20valor%20de%20${planElegido.precio}.%20Me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n`)

            return
        });



})