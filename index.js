const fs = require("fs")
const { default: makeWASocket, BufferJSON, initInMemoryKeyStore, DisconnectReason, MessageType,
    MessageOptions, MimeType } = require("@adiwajshing/baileys-md")
const { banner, getBuffer, getRandom } = require('./banco_de-dados/lib/functions')

// IRA PRECISAR //
const { menutxt } = require('./banco_de-dados/help')
const { fetchJson } = require('./banco_de-dados/lib/fetcher')
const { msgFilter } = require('./banco_de-dados/lib/antispam')
const thiccysapi = require('textmaker-thiccy');
const moment = require('moment-timezone')
const { translate } = require('bing-translate-api');
const { traceDeprecation } = require("process")

// DEFININDO //
const prefix = '/'

/********** TEMPO **********/
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    /********** MECIONADOR **********/
const mentions = (teks, memberr, id) => {
    (id == null || id == undefined || id == false) ? tobi.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : tobi.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
    }
    

async function start() {
    let dark = undefined;

    const connect = () => {
        let status = undefined;
        try {
            const value = JSON.parse(fs.readFileSync('./session.json', { encoding: 'utf-8' }), BufferJSON.reviver);
            status = {
                creds: value.creds,
                keys: initInMemoryKeyStore(value.keys)
            };
        } catch { }
        return status;
    };

    const saveConnection = (status) => {
        status = status || (dark === null || dark === void 0 ? void 0 : dark.authState);
        fs.writeFileSync('./session.json',
            JSON.stringify(status, BufferJSON.replacer, 2));
    };

    const starts = () => {
        const dark = makeWASocket({
            auth: connect(),
            printQRInTerminal: true,
        })
        console.log(banner.string)
        return dark;
    }

    dark = starts();
    await sleep(2500)
    console.log(color('[','white'), color('!','red'), color(']','white'), color('Va no whatsapp que você deseja colocar o bot, abra a opção whatsapp web, e escaneie esse código.'))
    console.log(color('[','white'), color('Aviso','red'), color(']','white'), color('Base feita por dark.'))
    console.log(color('[','white'), color('Aviso','red'), color(']','white'), color('Caso deseje fazer seu bot por cima, deixe os creditos.'))

    dark.ev.on('messages.upsert', async ({ messages }) => {

        try {
            // Ler... //
            msg = messages[0]
            if (!msg.message) return
            if (msg.key.fromMe) return
            const type = Object.keys(msg.message)[0]
            body = (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message[type].caption.startsWith(prefix) ? msg.message[type].caption : (type == 'videoMessage') && msg.message[type].caption.startsWith(prefix) ? msg.message[type].caption : (type == 'extendedTextMessage') && msg.message[type].text.startsWith(prefix) ? msg.message[type].text : (type == 'listResponseMessage') && msg.message[type].singleSelectenviar.selectedRowId ? msg.message[type].singleSelectenviar.selectedRowId : (type == 'buttonsResponseMessage') && msg.message[type].selectedButtonId ? msg.message[type].selectedButtonId : ""
            button = (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedDisplayText : ''
            chats = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
            selectedButton = (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
            responseButton = (type == 'listResponseMessage') ? msg.message.listResponseMessage.title : ''
            const from = msg.isGroup ? msg.participant : msg.key.fromMe ? dark.user.jid : msg.key.remoteJid
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? msg.participant : msg.key.remoteJid
            const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
            body = (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption.startsWith(prefix) ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption.startsWith(prefix) ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
            const groupMetadata = isGroup ? await dark.groupMetadata(from) : ''
            const groupId = isGroup ? groupMetadata.jid : ''
            const groupMembers = isGroup ? groupMetadata.participants : ''
            const groupName = isGroup ? groupMetadata.subject : ''

            // DEFINIR DONO //
            const donoNumero = [`55167991134413@s.whatsapp.net`] //Numero do dono
            const isDono = donoNumero.includes(sender)

            // PUXAR NOME DO USER //
            const pushname = msg.pushName || "Desconhecido"

            // ARGS //
            const args = body.trim().split(/ +/).slice(1)
            const q = args.join(" ")
            const isCmd = body.startsWith(prefix)
            // . //

            const isUrl = (url) => {
                return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
            }

  // Enviar Videos
  const enviarvid = (videoDir, caption) => {
    dark.sendMessage(from, {
        video: fs.readFileSync(videoDir),
        caption: caption
    })
}

//enviar gifs
const enviargif = (videoDir, caption) => {
    dark.sendMessage(from, {
        video: fs.readFileSync(videoDir),
        caption: caption,
        gifPlayback: true
    })
}

//Enviar Mensagens
const enviar = (string) => {
    dark.sendMessage(from, { text: string })
}

//Enviar Figurinhas

const enviarfig = (stickerDir) => {
    dark.sendMessage(from, {
        sticker: fs.readFileSync(stickerDir),
        mimetype: 'video/webp'
    })
}

            //Enviar Imagens

            const enviarimg = (imageDir, caption) => {
                dark.sendMessage(from, {
image: fs.readFileSync(imageDir),
caption: caption
                })
            }

/************** TYPE DOS CONSOLE ************/
  const content = JSON.stringify(msg.message)

/********** TIPOS DE MENSAGENS **********/
colors = ['red','white','black','blue','yellow','green']
//_TIPO DE MENSAGEM
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isDocument = type == 'documentMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isDocument) typeMessage = "Document"
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('textMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const stickerMessage = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const tipoMensagem = type == 'audioMessage' ? 'Audio' : type == 'stickerMessage' ? 'Sticker' : type == 'imageMessage' ? 'Imagem' : type == 'videoMessage' ? 'Video' : type == 'documentMessage' ? 'Documento' : type == 'contactMessage' ? 'Contato' : type == 'locationMessage' ? 'Localização' : 'Mensagem'
if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m CMD \x1b[1;37m]', color(command, "yellow"), 'do', color(pushname, "yellow"), 'horas', color(time, "yellow"))
if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MSG \x1b[1;37m]', color(`${tipoMensagem}`, "yellow"), 'do', color(pushname, "yellow"), 'horas', color(time, "yellow"))
if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m CMD \x1b[1;37m]', color(command, "yellow"), 'do', color(pushname, "yellow"), 'Em', color(groupName), 'horas', color(time, "yellow"))
if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MSG \x1b[1;37m]', color(`${tipoMensagem}`, "yellow"), 'do', color(pushname, "yellow"), 'Em', color(groupName), 'horas', color(time, "yellow"))
            switch (command) {

                case 'menu':
const timee = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
helptxt = `
╭──────────────────
│ _Olá -_ *"${pushname}"*!
│ _Agora são -_ *"${timee}"*!
╰──────────────────

╭──〘 Comandos 🔎 〙──
│
│
│  「 Info ℹ️ 」
│
│ 1 */?*
│ 2 */dono*
│
│  「 Comandos gp 🪀」
│
│ 3 */kick* 
│ _Marque uma mensagem do alvo_
│
│ 4 */reviver*
│ _Marque uma mensagem do alvo_
│
│ 5 */promote*
│ _Marque uma mensagem do alvo_
│
│ 6 */demote*
│ _Marque uma mensagem do alvo_
│
│ 7 */add*
│ _Ex: /add 5517991134416_
│
│
│  「Texto na imagem ✏️」
│
│ 8 */plaquinha* [nome]
│ 9 */light* [texto]
│ 10 */devil* [texto]
│ 11 */tec* [texto]
│ 12 */luz* [texto]
│ 13 */galaxia* [texto]
│ 14 */neon* [texto]
│ 15 */papel* [texto]
│ 16 */doce* [texto]
│ 17 */vela* [texto]
│ 18 */magma* [texto]
│ 19 */thunder* [texto]
│ 20 */glitch* [texto]
│ 21 */neon3d* [texto]
│ 22 */blood* [texto]
│ 23 */wall* [texto]
│ 24 */joker* [texto]
│ 25 */rua* [texto]
│ 26 */praia* [texto]
│ 27 */fiction* [texto]
│ 28 */potter* [texto]
│ 29 */neongreen* [texto]
│ 30 */blood2* [texto]
│ 31 */toxic* [texto]
│ 32 */metal* [texto]
│ 33 */urso* [texto]
│
│  「Random Imagens 」
│ 
│ 34 */loli*
│ 35 */cosplay*
│ 36 */husbu*
│
│
│  「Packs 🔞」
│ 
│ 37 */forestfaye*
│ 38 */leticia_shirayuki*
│ 39 */jenniie*
│ 40 */alinefaria*
│ 41 */honey69*
│ 42 */cclowniac*
│ 43 */sethi*
│ 44 */raychiel*
│ 45 */lais*
│ 46 */alinefox*
│ 47 */beatrzz*
│ 48 */bunni*
│ 49 */nivnixxi*
│ 50 */angela*
│ 51 */callmesloo*
│ 52 */hannahowo*
│ 53 */me1adinha*
│ 54 */cogumay*
│ 55 */fabiola_mendoza*
│ 56 */missbrasilia*
│ 57 */vitacelestine*
│ 58 */belledelphine*
│ 59 */mayakayagaia*
│ 60 */kittykum*
│ 61 */mackenzie*
│ 62 */fulltimecrybaby*
│ 63 */dracuina*
│ 64 */saekkico*
│ 65 */lynienicole*
│ 66 */powrice*
│ 67 */wendy666*
│ 68 */shirokitsune*
│ 69 */moonfox*
│ 70 */love_lilah*
│ 71 */mcmirella*
│
│  「Outros」
│ 
│ 72 */morte* 
│ 73 */genero* 
│ 74 */traduzir* 
│ 
│
╰────────────────
╭────────────────
│ Dono - "Dark"
│ Yt → Darkkk
│ Wpp → 17991134416
│ Info → /dono
│
╰──〘 Mia 〙──`

                  mett = ["1", "2", "3", "4", "5"] 
                  res = mett[Math.floor(Math.random() * mett.length)]
                  if (res == "1") {
                   enviargif('./banco_de-dados/imgs/login.mp4', helptxt)
mett = ["1", "2", "3", "4", "5"] 
                  res = mett[Math.floor(Math.random() * mett.length)]
                  } else if (res == "2") {
                  enviargif('./banco_de-dados/imgs/menu2.mp4', helptxt)
                  } else if (res == "3") {
mett = ["1", "2", "3", "4", "5"] 
res = mett[Math.floor(Math.random() * mett.length)]
enviargif('./banco_de-dados/imgs/menu3.mp4', helptxt)
                  } else if (res == "4") {
mett = ["1", "2", "3", "4", "5"] 
res = mett[Math.floor(Math.random() * mett.length)]
enviargif('./banco_de-dados/imgs/menu5.mp4', helptxt)
                  } else if (res == "5") {
mett = ["1", "2", "3", "4", "5"] 
res = mett[Math.floor(Math.random() * mett.length)]
enviarimg('./banco_de-dados/imgs/menu6.jpg', helptxt)
                  }
                break
                //?//
                case '?':
txt = `Como o Baileys Multi Device (MD) ainda esta em beta vc notara alguns bugs, e instabilidade, mas acho que com o tempo isso ira ser corrigido.

1 - _Base._

Nessa Base contem:

Console log configurado;

Alguns comandos de grupo;

Imagens aleatorias;

Menu configurado;

Base Enviar Imagens, Enviar Figurinhas, Enviar Mensagens, Enviar gifs e audios;

Base de comandos textpro.

Obs: Apenas o basico para vc começar a montar seu bot.

[ Ainda falta algumas ifs nos comandos de grupos, porem fiquei sem tempo para colocar. ]


2 - _Vantagens._


4 dispositivos simultaneamente;

Funciona independente do celular;

Conecta ao whatsapp via WebSocket;

Comandos mais fáceis.


3 - _Creditos._

Agradecimentos total a *WhatsApp Web API Baileys MD*

https://github.com/adiwajshing/baileys/tree/multi-device

`
enviargif('./banco_de-dados/imgs/menu5.mp4', txt)
break

   // /BASES PARA DEVS/ //
   case 'a': //texto
    enviar('a')
    break
case 'imagem': //imagem
enviarimg('./banco_de-dados/imgs/cat.jpg', '© 2021 Dark')
break
case 'video': //video
enviarvid('./banco_de-dados/videos/video1.mp4', '© 2021 Dark')
break
case 'audio': //audio
enviaraudio('./banco_de-dados/audios/wtf.mp3')
break
case 'fig': //fig
enviarfig('./banco_de-dados/figs/fig1.webp')
break
case 'gif': //gif
enviargif('./banco_de-dados/gif/morte.mp4', '© 2021 Dark')
break
// by dark. //

//imagens aleatorias
 case 'loli': 
wipu = await fetchJson(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json`)
let wipi = wipu[Math.floor(Math.random() * (wipu.length))]
anu1 = await getBuffer(wipi)
await dark.sendMessage(from, {
    image: anu1,
    quoted: msg,
    caption: '© 2021 Dark'
})      
break
case 'cosplay': 
cos = await fetchJson(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json`) 
let play = cos[Math.floor(Math.random() * (cos.length))]
anu1 = await getBuffer(play)
await dark.sendMessage(from, {
    image: anu1,
    quoted: msg,
    caption: '© 2021 Dark'
})      
break
case 'husbu': 
hus = await fetchJson(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/husbu.json`)
let bu = hus[Math.floor(Math.random() * (hus.length))]
anu1 = await getBuffer(bu)
await dark.sendMessage(from, {
    image: anu1,
    quoted: msg,
    caption: '© 2021 Dark'
})      
break

//text pros feitos por dark.
case 'rua':	
if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .rua dark')
enviar('Aguarde, estou renderizando a imagem.')
thiccysapi.textpro("https://textpro.me/road-warning-text-effect-878.html",
`${q}`
).then(async (data) => { 
   try { 
 let di = await getBuffer(data)
 await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
 console.log(data)
    } catch(err) { 
   console.log(err)
    } 
     });
  break
	case 'thunder':	
	if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .thunder dark')
	enviar('Aguarde, estou renderizando a imagem.')
	thiccysapi.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html",
	`${q}`
	).then(async (data) => { 
	   try { 
	 let di = await getBuffer(data)
	  await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
	 console.log(data)
		} catch(err) { 
	   console.log(err)
		} 
		 });
	  break
	  case 'glitch':	
	  if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .glitch dark')
	  enviar('Aguarde, estou renderizando a imagem.')
	  thiccysapi.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html",
	  `${q}`
	  ).then(async (data) => { 
		 try { 
	   let di = await getBuffer(data)
	    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
	   console.log(data)
		  } catch(err) { 
		 console.log(err)
		  } 
		   });
		break
		case 'neon3d':	
		if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .neon3d dark')
		enviar('Aguarde, estou renderizando a imagem.')
		thiccysapi.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html",
		`${q}`
		).then(async (data) => { 
		   try { 
		 let di = await getBuffer(data)
		  await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
		 console.log(data)
			} catch(err) { 
		   console.log(err)
			} 
			 });
		  break
		  case 'blood':	
		  if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .blood dark')
		  enviar('Aguarde, estou renderizando a imagem.')
		  thiccysapi.textpro("https://textpro.me/blood-text-on-the-frosted-glass-941.html",
		  `${q}`
		  ).then(async (data) => { 
			 try { 
		   let di = await getBuffer(data)
		    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
		   console.log(data)
			  } catch(err) { 
			 console.log(err)
			  } 
			   });
			break
			case 'wall':	
			if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .wall dark')
			enviar('Aguarde, estou renderizando a imagem.')
			thiccysapi.textpro("https://textpro.me/break-wall-text-effect-871.html",
			`${q}`
			).then(async (data) => { 
			   try { 
			 let di = await getBuffer(data)
			  await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
			 console.log(data)
				} catch(err) { 
			   console.log(err)
				} 
				 });
			  break
			  case 'joker':	
			  if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .joker dark')
			  enviar('Aguarde, estou renderizando a imagem.')
			  thiccysapi.textpro("https://textpro.me/create-logo-joker-online-934.html",
			  `${q}`
			  ).then(async (data) => { 
				 try { 
			   let di = await getBuffer(data)
			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
			   console.log(data)
				  } catch(err) { 
				 console.log(err)
				  } 
				   });
				break
                case 'praia':	
				  if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .praia dark')
				  enviar('Aguarde, estou renderizando a imagem.')
				  thiccysapi.textpro("https://textpro.me/sand-engraved-3d-text-effect-989.html",
				  `${q}`
				  ).then(async (data) => { 
					 try { 
				   let di = await getBuffer(data)
				   			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
				   console.log(data)
					  } catch(err) { 
					 console.log(err)
					  } 
					   });
					break
					case 'fiction':	
					if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .fiction dark')
					enviar('Aguarde, estou renderizando a imagem.')
					thiccysapi.textpro("https://textpro.me/create-science-fiction-text-effect-online-free-1038.html",
					`${q}`
					).then(async (data) => { 
					   try { 
					 let di = await getBuffer(data)
					 			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
					 console.log(data)
						} catch(err) { 
					   console.log(err)
						} 
						 });
					  break
					  case 'potter':	
					  if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .potter dark')
					  enviar('Aguarde, estou renderizando a imagem.')
					  thiccysapi.textpro("https://textpro.me/create-harry-potter-text-effect-online-1025.html",
					  `${q}`
					  ).then(async (data) => { 
						 try { 
					   let di = await getBuffer(data)
					   			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
					   console.log(data)
						  } catch(err) { 
						 console.log(err)
						  } 
						   });
						break
						case 'neongreen':	
						if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .neongreen dark')
						enviar('Aguarde, estou renderizando a imagem.')
						thiccysapi.textpro("https://textpro.me/green-neon-text-effect-874.html",
						`${q}`
						).then(async (data) => { 
						   try { 
						 let di = await getBuffer(data)
						 			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
						 console.log(data)
							} catch(err) { 
						   console.log(err)
							} 
							 });
						  break
						  case 'blood2':	
						  if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .blood2 dark')
						  enviar('Aguarde, estou renderizando a imagem.')
						  thiccysapi.textpro("https://textpro.me/horror-blood-text-effect-online-883.html",
						  `${q}`
						  ).then(async (data) => { 
							 try { 
						   let di = await getBuffer(data)
						   			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
						   console.log(data)
							  } catch(err) { 
							 console.log(err)
							  } 
							   });
							break
							case 'toxic':	
							if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .toxic dark')
							enviar('Aguarde, estou renderizando a imagem.')
							thiccysapi.textpro("https://textpro.me/toxic-text-effect-online-901.html",
							`${q}`
							).then(async (data) => { 
							   try { 
							 let di = await getBuffer(data)
							 			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
							 console.log(data)
								} catch(err) { 
							   console.log(err)
								} 
								 });
							  break
							  case 'metal':	
							  if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .metal dark')
							  enviar('Aguarde, estou renderizando a imagem.')
							  thiccysapi.textpro("https://textpro.me/hot-metal-text-effect-843.html",
							  `${q}`
							  ).then(async (data) => { 
								 try { 
							   let di = await getBuffer(data)
							   			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
							   console.log(data)
								  } catch(err) { 
								 console.log(err)
								  } 
								   });
								break
								case 'urso':	
								if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .urso dark')
								enviar('Aguarde, estou renderizando a imagem.')
								thiccysapi.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html",
								`${q}`
								).then(async (data) => { 
								   try { 
								 let di = await getBuffer(data)
								 			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
								 console.log(data)
									} catch(err) { 
								   console.log(err)
									} 
									 });
								  break
								  case 'urso':	
								  if(!q) return enviar('Digite o texto que vai aparecer na imagem | Exemplo: .urso dark')
								  enviar('Aguarde, estou renderizando a imagem.')
								  thiccysapi.textpro("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html",
								  `${q}`
								  ).then(async (data) => { 
									 try { 
								   let di = await getBuffer(data)
								   			    await dark.sendMessage(from, {
    image: di,
    quoted: msg,
    caption: '© 2021 Dark'
})
								   console.log(data)
									  } catch(err) { 
									 console.log(err)
									  } 
									   });
									break
//packs, cases feitas por dark
//links fornecidos por Área51 Dos Links
case 'forestfaye':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/forestfaye.jpeg`)
txt = `*Pack da ForestFayee* _(Google Fotos)_\n\nhttps://bit.ly/2ZmIwGi`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'leticia_shirayuki':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/leticia.jpeg`)
txt = `*Pack da Leticia Shirayuki* _(Google Fotos)_\n\nhttps://bit.ly/3vOJsPZ`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'jenniie':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/jennie.jpeg`)
txt = `*Pack da Jenniie__s* _(Google Fotos)_\n\nhttps://bit.ly/3EkmYts`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'alinefaria':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/alinefaria.jpeg`)
txt = `*Pack da Aline Faria* _(Google Fotos)_\n\nhttps://bit.ly/3GqaUZd`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'honey69':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/honey.jpeg`)
txt = `*Pack da oh_honey69* _(Google Fotos)_\n\nhttps://bit.ly/3CjMzCa`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'cclowniac':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/cclowniac.jpeg`)
txt = `*Pack da Cclowniac* _(Google Fotos)_\n\nhttps://bit.ly/3mmeonT`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'sethi':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/ms.sethi.jpeg`)
txt = `*Pack da ms.sethi* _(Google Fotos)_\n\nhttps://bit.ly/3GqQtM2`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'raychiel':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/raychiel.jpeg`)
txt = `*Pack da Raychiel* _(Google Fotos)_\n\nhttps://bit.ly/3BaxgtT`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'lais':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/lais.jpeg`)
txt = `*Pack da Lais Rodrigues* _(Google Fotos)_\n\nhttps://bit.ly/3jF5Oyu`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'alinefox':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/alinefox.jpeg`)
txt = `*Pack da Aline Fox* _(Google Fotos)_\n\nhttps://bit.ly/3b8EnZm`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'beatrzz':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/beatrzzfonseca.jpeg`)
txt = `*Pack da Beatrzzfonseca* _(Google Fotos)_\n\nhttps://bit.ly/3CjOCGm`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'bunni':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/bunni3png.jpeg`)
txt = `*Pack da bunni3png* _(Google Fotos)_\n\nhttps://bit.ly/3mfl7j7`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'nivnixxi':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/nivnixxi.jpeg`)
txt = `*Pack da nivnixxi* _(Google Fotos)_\n\nhttps://bit.ly/3En1j3P`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'angela':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Angela.jpeg`)
txt = `*Pack da Angela Halee* _(Google Fotos)_\n\nhttps://bit.ly/30QIgQH`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'callmesloo':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/callmesloo.jpeg`)
txt = `*Pack da callmesloo* _(Google Fotos)_\n\nhttps://bit.ly/3vJ5mEq`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'hannahowo':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Hannahowo.jpeg`)
txt = `*Pack da Hannahowo* _(Google Fotos)_\n\nhttps://bit.ly/3mb8xS6`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'me1adinha':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Me1adinha.jpeg`)
txt = `*Pack da Me1adinha* _(Google Fotos)_\n\nhttps://bit.ly/2ZyzfLP`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'cogumay':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Cogumay.jpeg`)
txt = `*Pack da Cogumay* _(Google Fotos)_\n\nhttps://bit.ly/3GkVzsV`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'fabiola_mendoza':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Fabiola_mendoza.jpeg`)
txt = `*Pack da Fabiola mendoza* _(Google Fotos)_\n\nhttps://bit.ly/3BcLY3D`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'missbrasilia':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/missbrasilia.jpeg`)
txt = `*Pack da missbrasilia* _(Google Fotos)_\n\nhttps://bit.ly/3BdE2iv`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'fegalvao':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Fegalvao.jpeg`)
txt = `*Pack da Fegalvao* _(Google Fotos)_\n\nhttps://bit.ly/3jEZwPv`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'vitacelestine':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/VitaCelestine.jpeg`)
txt = `*Pack da Vita Celestine* _(Google Fotos)_\n\nhttps://bit.ly/316KeNf`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'belledelphine':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Belledelphine.jpeg`)
txt = `*Pack da Belle delphine* _(Google Fotos)_\n\nhttps://bit.ly/3pAKY7p`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'mayakayagaia':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/mayakayagaia.jpeg`)
txt = `*Pack da mayakayagaia* _(Google Fotos)_\n\nhttps://bit.ly/3CfKiI3`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'kittykum':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/KittyKum.jpeg`)
txt = `*Pack da Kitty x Kum* _(Google Fotos)_\n\nhttps://bit.ly/3ClliiA`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'mackenzie':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Mackenzie.jpeg`)
txt = `*Pack da Mackenzie* _(Google Fotos)_\n\nhttps://bit.ly/3GmKDLt`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'fulltimecrybaby':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/fulltimecrybaby.jpeg`)
txt = `*Pack da fulltimecrybaby* _(Google Fotos)_\n\nhttps://bit.ly/3pDkOB1`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'dracuina':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/dracuina.jpeg`)
txt = `*Pack da dracuina* _(Google Fotos)_\n\nhttps://bit.ly/3meqOhl`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'saekkico':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Saekkico.jpeg`)
txt = `*Pack da Saekkico* _(Google Fotos)_\n\nhttps://bit.ly/3GpuWDa`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'lynienicole':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/lynienicole.jpeg`)
txt = `*Pack da lynienicole* _(Google Fotos)_\n\nhttps://bit.ly/3meosz2`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'powrice':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Powrice.jpeg`)
txt = `*Pack da Powrice* _(Google Fotos)_\n\https://bit.ly/3mdkoin`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'wendy666':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Wendy666.jpeg`)
txt = `*Pack da Wendy666* _(Google Fotos)_\n\https://bit.ly/3Ei84DP`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'ShiroKitsune':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/ShiroKitsune.jpeg`)
txt = `*Pack da Shiro Kitsune* _(Google Fotos)_\n\https://bit.ly/3pFtIxM`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'moonfox':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/moonfox.jpeg`)
txt = `*Pack da moonfox* _(Google Fotos)_\n\https://bit.ly/3Cfypli`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'love_lilah':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/Love_Lilah.jpeg`)
txt = `*Pack da Love Lilah* _(Google Fotos)_\n\https://bit.ly/3mh8og8`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
case 'mcmirella':
buffer = fs.readFileSync(`banco_de-dados/imgs/packs/mcmirella.jpeg`)
txt = `*Pack da mcmirella* _(Google Fotos)_\n\https://bit.ly/3GhgmxH`
await dark.sendMessage(from, {
    image: buffer,
    quoted: msg,
    caption: txt
})
break
//grupos
case 'kick':
    if (!isGroup) return enviar('Esse comando so funciona em grupo, sinto muito')

if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return enviar('Marque uma mensagem do alvo!')
kick = msg.message.extendedTextMessage.contextInfo.participant
const response = await dark.groupParticipantsUpdate(
    from, 
    [kick],
    "remove" 
)
enviar('Usuario Removido')
break
case 'reviver':
    if (!isGroup) return enviar('Esse comando so funciona em grupo, sinto muito')

if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return enviar('Marque uma mensagem do alvo!')
add = msg.message.extendedTextMessage.contextInfo.participant
const response2 = await dark.groupParticipantsUpdate(
    from, 
    [add],
    "add" 
)
enviar('Usuario Adicionado de volta ao grupo.')
break
case 'promote':
    if (!isGroup) return enviar('Esse comando so funciona em grupo, sinto muito')

if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return enviar('Marque uma mensagem do alvo!')
promover = msg.message.extendedTextMessage.contextInfo.participant
const response3 = await dark.groupParticipantsUpdate(
    from, 
    [promover],
    "promote" 
)
marcar = msg.message.extendedTextMessage.contextInfo.participant
enviar(`*@${marcar.split('@')[0]}* Agora é admintrador.`)
break
case 'demote':
    if (!isGroup) return enviar('Esse comando so funciona em grupo, sinto muito')

if (msg.message.extendedTextMessage === undefined || msg.message.extendedTextMessage === null) return enviar('Marque uma mensagem do alvo!')
rebaixar = msg.message.extendedTextMessage.contextInfo.participant
const response4 = await dark.groupParticipantsUpdate(
    from, 
    [rebaixar],
    "demote" 
)
marcar2 = msg.message.extendedTextMessage.contextInfo.participant
enviar(`Pronto, *@${marcar2.split('@')[0]}* Perdeu seu cargo de admintrador`)
break 
case 'add':
  
    try {
    if (msg.message.extendedTextMessage === null || msg.message.extendedTextMessage === undefined) {
    adduser = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
    response = await dark.groupParticipantsUpdate(
        from, 
        [adduser],
        "add" 
    )
    o = response.participants[0]
    let inv = (Object.values(o))
    if(inv[0].code == 409) return enviar('O alvo já está no grupo!')
    if(inv[0].code == 403) return enviar('Erro, conta privada do usuário')
    if(inv[0].code == 408) return enviar('Erro, usuário acabou de sair')
    if(inv[0].code == 401) return enviar('Erro, porque o bot está bloqueado pelo alvo ')
    } else {
    adduser = msg.message.extendedTextMessage.contextInfo.participant
    response =  await dark.groupParticipantsUpdate(
        from, 
        [adduser],
        "add" 
    )
    o = response.participants[0]
    let inv = (Object.values(o))
    if(inv[0].code == 409) return enviar('O alvo já está no grupo! ')
    if(inv[0].code == 403) return enviar('Falhou, porque em privado ')
    if(inv[0].code == 408) return enviar('Falha, porque o alvo acabou de sair ')
    if(inv[0].code == 401) return enviar('Falha, porque o bot está bloqueado pelo alvo ')
    }
    } catch {
    return 
    }
    break

case 'dono':
    txtdono = `
Dono da Base: _Dark_

YouTube: https://bit.ly/3wBnkZH

WhatsApp: +5517991134416

Grupo (Chat): https://bit.ly/30lHU4F

Grupo (Bots): https://bit.ly/3Hkr8Uq`
enviargif('./banco_de-dados/imgs/menu3.mp4', txtdono)
break

//interativos
case 'morte':
    if(!q) return enviar(`Digite o seu nome, ou nome de outra pessoa | Exemplo: ${p}morte marcos`)
        api = await fetchJson(`https://api.agify.io/?name=${q}`)
        texto = `Pessoas com o nome ${q} costumam morrer com ${api.age} anos\n\n© 2021 Dark`
        enviargif('./banco_de-dados/gif/morte.mp4', texto)
        break
        case 'traduzir':
            if(!q) return reply('Digite o texto a ser traduzido | Exemplo: .traduzir hello')
            translate(`${q}`, null, 'pt', true).then(res => {
                texto = `A tradução de "${q}" para português é: ${res.translation}`
                imgapi = `https://clutamac.sirv.com/fundo-infinito-fotografico-papel-branco-tam-2-40x10m-fundo-infinito.jpg?text.0.text=${res.translation}&text.0.position.gravity=center&text.0.position.y=17%25&text.0.size=26&text.0.color=000000&text.0.font.family=Roboto`
 enviarimg('./banco_de-dados/imgs/trad.jpg', texto) 
}); 
break
        case 'genero':
            if(!q) return reply('Digite o seu nome, ou nome de outra pessoa | Exemplo: .genero marcos')
                api = await fetchJson(`https://api.genderize.io/?name=${q}`)
            translate(`${api.gender}`, null, 'pt', true).then(res => {
                texto = `Pessoas com o nome ${q} geralmente são ${res.translation}'s`
                enviargif('./banco_de-dados/gif/genero.mp4', texto)
            });
                break


               
            }

        } catch (e) {
            console.log(e)
        }

    })

    dark.ev.on('connection.update', (update) => {
        var _a, _b;
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut) {
                dark = starts();
            }
            else {
                console.log('Conexão fechou');
            }
        }
        console.log('Conexão atualizada', "Conectando...");
        
    });
    dark.ev.on('auth-state.update', saveConnection)
}

start()