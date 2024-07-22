const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use morgan for logging HTTP requests
app.use(morgan('dev'));

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fetch guild member count
app.get('/api/members', async (req, res) => {
    try {
        const response = await axios.get(`https://discord.com/api/v9/guilds/${process.env.GUILD_ID}`, {
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
        });
        console.log('Member count data:', response.data);
        res.json({ memberCount: response.data.approximate_member_count });
    } catch (error) {
        console.error('Error fetching member count:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching member count');
    }
});

// Fetch guild staff members
app.get('/api/staff', (req, res) => {
    const staff = [
        {
            username: "trillslime_tay",
            id: "1111829802891092068",
            info: "I am 19 years old and love to play Call of Duty."
        },
        {
            username: "Founder",
            id: "0000000000000000000",
            info: "I founded this amazing community to bring together Call of Duty enthusiasts."
        }
    ];
    console.log('Staff data:', staff);
    res.json(staff);
});

// Fetch server events
app.get('/api/events', (req, res) => {
    const events = [
        {
            name: "Double XP Weekend",
            date: "July 24, 2024"
        },
        {
            name: "Clan Wars",
            date: "August 1, 2024"
        },
        {
            name: "Zombie Invasion Night",
            date: "August 15, 2024"
        }
        // Add more events as needed
    ];
    console.log('Events data:', events);
    res.json(events);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
