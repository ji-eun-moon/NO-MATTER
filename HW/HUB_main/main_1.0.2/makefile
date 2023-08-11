CC = g++
CFLAGS = -I/path/to/wiringPi/includes -I/path/to/mosquitto/includes 
LDFLAGS = -lmosquitto -lwiringPi -pthread

OUTPUT = main.out


SOURCES = ./main.cpp ./commands.cpp


OBJECTS = $(SOURCES:.cpp=.o)



$(OUTPUT): $(OBJECTS)
	$(CC) $(OBJECTS) -o $(OUTPUT) $(LDFLAGS)


%.o: %.cpp
	$(CC) $(CFLAGS) -c $< -o $@


clean:
	rm -f $(OBJECTS) $(OUTPUT)


