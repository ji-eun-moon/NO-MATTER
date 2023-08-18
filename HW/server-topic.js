const fs = require('fs');
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

function isTopicMatching(topic, name) {
  if(topic=='*' || name=='*') return true
  if (name.endsWith('*')) {
    const prefix = name.slice(0, -1);
    return topic.startsWith(prefix);
  }
  else if (topic.endsWith('*')) {
    const prefix = topic.slice(0, -1);
    return name.startsWith(prefix);
  }
  else return topic===name;
}




const clientTopics = {};

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});


const port = 3002;



const portS = 8443; // HTTPS 포트
const privateKeyPath = '/etc/letsencrypt/live/i9c105.p.ssafy.io/privkey.pem';
const certificatePath = '/etc/letsencrypt/live/i9c105.p.ssafy.io/cert.pem';
const caPath = '/etc/letsencrypt/live/i9c105.p.ssafy.io/chain.pem';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
const ca = fs.readFileSync(caPath, 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const serverS = require("https").createServer(credentials, app);
const ioS = require("socket.io")(serverS, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});


function broadcastMessageToBothIOs(message) {
  io.emit('message', message);
  ioS.emit('message', message);
}




server.listen(port, () => {
  console.log(
    `##### server is running on http://i9c105.p.ssafy.io:3002, https://i9c105.p.ssafy.io:8443. ${new Date().toLocaleString()} #####`
  );
});

serverS.listen(portS);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('subscribe', (topic) => {
    console.log(`Client subscribed to topic: ${topic}`);
    if(!(topic in clientTopics)) {
      clientTopics[topic] = 0;
    }
    clientTopics[topic] += 1;


    socket.join(topic);
  });
  
  socket.on('unsubscribe', (topic) => {
    console.log(`Client unsubscribed from topic: ${topic}`);
    if(clientTopics[topic] > 0) {
      clientTopics[topic] -= 1;
    }
    socket.leave(topic);
  });
  
  socket.on('publish', (data) => {
    console.log(`Received message for topic ${data.topic}: ${data.message}`);
  
    console.log("clientTopics: ", clientTopics);
    for (const clientTopic in clientTopics) {
      if(clientTopics[clientTopic]!==0) {
        if(isTopicMatching(data.topic, clientTopic)) {
          io.to(clientTopic).emit('message', data.topic+'#'+data.message);
  	  ioS.to(clientTopic).emit('message', data.topic+'#'+data.message);
        }
      }
    };
  });
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

ioS.on('connection', (socketS) => {
  console.log('ClientS connected');
  socketS.on('subscribe', (topic) => {
    console.log(`Client subscribed to topic: ${topic}`);
    if(!(topic in clientTopics)) {
  	clientTopics[topic] = 0;
    }
    clientTopics[topic] += 1;
    socketS.join(topic);
  });
  
  socketS.on('unsubscribe', (topic) => {
    console.log(`Client unsubscribed from topic: ${topic}`);
    if(clientTopics[topic] > 0) {
      clientTopics[topic] -= 1;
    }
    socketS.leave(topic);
  });
  
  socketS.on('publish', (data) => {
    console.log(`Received message for topic ${data.topic}: ${data.message}`);
  
    console.log("clientTopics: ", clientTopics);
    for (const clientTopic in clientTopics) {
      if(clientTopics[clientTopic]!==0) {
        if(isTopicMatching(data.topic, clientTopic)) {
          io.to(clientTopic).emit('message', data.topic+'#'+data.message);
  	  ioS.to(clientTopic).emit('message', data.topic+'#'+data.message);
        }
      }
    };
  });
  socketS.on('disconnect', () => {
  console.log('clientS disconnedted');
  })
});





