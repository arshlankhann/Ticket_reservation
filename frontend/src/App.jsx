import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "https://ticket-reservation-q1xi.vercel.app/";

function App() {
  const [event, setEvent] = useState([]);
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);

  const fetchEvents = async () => {
    const res = await axios.get(`${API}/events`);
    setEvent(res.data);
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const bookTicket = async()=>{
    try{
      const res = await axios.post(`${API}/book`,{
        userEmail:email,
        eventId: selected._id,
        seatsRequired: seats,
      })
      alert("Booking successful")
      setSelected(null)
      setEmail("")
      setSeats(1)
      fetchEvents()
    }catch(err){
      alert(err.response.data.error ||"Booking failed")
    }
  };

  return (
    <>
      <h1>Ticket Reservation</h1>
      {!selected &&
        event.map((e) => (
          <div key={e._id}>
            <h3>{e.title}</h3>
            <p>
              {e.date} | {e.venue}
            </p>
            <p>Seats Left:{e.availableSeats}</p>
            <button
              onClick={() => {
                setSelected(e);
              }}
            >
              Book
            </button>
          </div>
        ))}
      {selected && (
        <div>
          <h2>{selected.title}</h2>
          <p>Available Seats:{selected.availableSeats}</p>
          <input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="number"
            value={seats}
            min={1}
            onChange={(e) => {
              setSeats(Number(e.target.value));
            }}
          />
          <button onClick={bookTicket}>Confirm Booking</button>
        </div>
      )}
    </>
  );
}

export default App;
