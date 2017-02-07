function Chat(_nombre, _imagen,_position)
{
	this.nombre =  _nombre;
	this.imagenURL = _imagen;
	this.ultimoMensaje = "";
	this.horaUltimoMensaje = '';
	this.misChats= [];
	this.mishoras=[];
	this.tamano=0;
	this.posicion=_position;
	this.ultimo="";
	this.ultimohora="";
	this.borrarMensajes = function()
	{
	};
	this.tamano= function(){
		return misChats.length;
	}
	this.setposition= function(_miposicion){
		this.posicion= _miposicion;
	}
	this.getUltimo= function(){
		this.ultimo=this.misChats[this.misChats.length-1]
		return this.ultimo;
	}
	this.getUltimaHora= function(){
		this.ultimohora=this.mishoras[this.mishoras.length-1]
		return this.ultimohora;
	}
}

var dataListaChats = [
	new Chat("chat 1", 'image/logocodeacademy.png',1),
	new Chat("chat 2", 'image/logocodeacademy.png',2),
	new Chat("chat 3", 'image/logocodeacademy.png',3),
	new Chat("chat 4", 'image/logocodeacademy.png',4),
	new Chat("chat 5", 'image/logocodeacademy.png',5),
	new Chat("chat 6", 'image/logocodeacademy.png',6),
	new Chat("chat 7", 'image/logocodeacademy.png',7),
	new Chat("chat 8", 'image/logocodeacademy.png',8),
	new Chat("chat 9", 'image/logocodeacademy.png',9),
	new Chat("chat 10", 'image/logocodeacademy.png',10),
	new Chat("chat 11", 'image/logocodeacademy.png',11)
];
//Parte visual
var liListItem = null;

function init() {

	initChatList();
}

function initChatList() {
	var elListaChats = document.getElementById("lista-chats");

	for (var i in dataListaChats) {
		var htmlChatItem = '<li><div class="avatar">' +
			'<img src="' + dataListaChats[i].imagenURL +  '" alt="" class="wh-44">' +
			'<h4 class="w-contact-name">' + dataListaChats[i].nombre + '</h4>' +
			'<p class="w-last-message" id="mensaje">' + dataListaChats[i].ultimoMensaje + '</p>' +
			'</div>' +
			'<div class="time" id="hora">' + dataListaChats[i].horaUltimoMensaje + '</div></li>';
		dataListaChats[i].borrarMensajes();
		elListaChats.innerHTML += htmlChatItem;
	}

	setEventsChatList();
}

function setEventsChatList() {
	var listaChats = document.getElementById('lista-chats');
	var arrListItems = listaChats.getElementsByTagName('li');

	for (var i = 0; i < arrListItems.length; i++) {
		/*arrListItems[i].onclick = function(){
		 alert("Click!");
		 };*/
		arrListItems[i].addEventListener('click', onChatItemClick);
	}
}

function onChatItemClick(evt) {
	//console.log(evt.currentTarget);
	var contactName = evt.currentTarget.getElementsByClassName('w-contact-name')[0].textContent;
	var imgURL = evt.currentTarget.getElementsByClassName('wh-44')[0].src;
	//console.log('click');
	actualizarCabeceraChat(contactName, imgURL, "Conectado");
}

function onMensajeKey(evt) {
	if (evt.keyCode == 13) {
		var elInputMensajes = document.getElementById("mensajes");
		var cabecera= document.getElementById("chat-header");
		var nombreChat= cabecera.childNodes[1].childNodes[3].textContent;
		crearChat(elInputMensajes.value);
		crearMensaje(elInputMensajes.value,nombreChat);
		elInputMensajes.value = "";		
	}
}

function crearMensaje(_mensaje, _nombreChat) {
	var htmlMensajeIn = '<div class="w-message w-message-in">' +
		'<div class="w-message-text">' +
		'<h5 class="green-1">Maria Paula Rivarola</h5>' +
		'<p>Jajaja Sii finalmente se corto!!</p>' +
		'<div class="time">11:13</div>' +
		'</div>' +
		'</div>';

	var d = new Date();
	var htmlMensajeOut = '<div class="w-message w-message-out">' +
		'<div class="w-message-text">' +
		'<p>' + _mensaje + '</p>' +
		'<div class="time">' + d.getHours() + ':' + d.getMinutes();
	+'</div>' +
	'</div>' +
	'</div>';

	//var mensaje = liListItem.getElementsByClassName("w-last-message")[0];
	//mensaje.innerHTML = _mensaje;
	//console.log(mensaje);
  

	var elChat = document.getElementById("chat");
	elChat.innerHTML += htmlMensajeOut;
	elChat.scrollTop = elChat.scrollHeight;
	//console.log(_nombreChat);
	for (i in dataListaChats)
	{
		if(dataListaChats[i].nombre==_nombreChat)
		{
			//console.log(dataListaChats[i].nombre);
			dataListaChats[i].misChats.push(_mensaje);
			dataListaChats[i].mishoras.push( d.getHours() + ':' + d.getMinutes());
		}
	}

	 actualizarUltimoChat(_nombreChat,_mensaje);
}

function crearChat(_mensaje,_contactName) {
	
	setEventsChatList();
	//elListaChats.innerHTML += htmlChatItem;
}
function actualizarUltimoChat(_contactName,_mensaje){
	var ul= document.getElementById("lista-chats");
	//console.log(_contactName);
	//console.log(_mensaje);
	
		for (var i=0; i< ul.childNodes.length;i++)
		{
			
			//console.log(ul.childNodes[i].childNodes[1]);
			if(ul.getElementsByTagName("h4")[i].textContent==_contactName)
			{
				//console.log(ul.getElementsByTagName("h4")[i].textContent);
				for(x in dataListaChats)
				{
					if(dataListaChats[x].nombre==ul.getElementsByTagName("h4")[i].textContent)
					{
						ul.getElementsByTagName("p")[x].textContent=dataListaChats[x].getUltimo();
						ul.childNodes[i].childNodes[1].textContent= dataListaChats[x].getUltimaHora();
					}
				}
			}
		
		}
}
function dibujarChats(_mensajesIn,_name,_horas)
{
	var chat= document.getElementById("chat");
	var htmlMensajeIn = '<div class="w-message w-message-out">' +
		'<div class="w-message-text">' +
		'<p>'+_mensajesIn+'</p>' +
		'<div class="time">'+_horas+'</div>' +
		'</div>' +
		'</div>';
		chat.innerHTML += htmlMensajeIn;

}
function actualizarCabeceraChat(_contactName, _imageURL, _estado) {
	var chatHeader = document.getElementById("chat-header");
	chatHeader.getElementsByClassName('w-contact-name')[0].innerHTML = _contactName;
	chatHeader.getElementsByClassName('w-users-messages')[0].innerHTML = _estado;
	chatHeader.getElementsByTagName('img')[0].src = _imageURL;
	var chat= document.getElementById("chat");
	chat.innerHTML="";
	for(i in dataListaChats)
	{
		if(dataListaChats[i].nombre==_contactName)
		{
			for(x in dataListaChats[i].misChats)
			{
				dibujarChats(dataListaChats[i].misChats[x],_contactName,dataListaChats[i].mishoras[x]);
			}
		
		}
	}
	
	
}
