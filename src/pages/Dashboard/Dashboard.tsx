import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import axios from 'axios';

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getCommentsList();
    }, []);

    const getCommentsList = () => {
        axios.get('https://jsonplaceholder.typicode.com/comments').then((res: any) => {
            if(res.status === 200) {
                setData(res.data);
            }
        })
    }

  return (
    <List
      sx={{
        width: '100%',
        boxShadow: '0 4px 8px -4px rgba(0, 0, 0, 0.5)'
      }}
    >
        <Typography variant='h4' sx={{ textAlign: "center", marginTop: "10px", marginBottom: "20px" }}>
            Welcome to Dashboard
        </Typography>
        { data.map((val: any, index: any) => (
            <div className="cus-pad" key={`dash${index}`}>
                <ListItem>
                    <ListItemText primary={<Typography variant="h6" sx={{ textTransform: "capitalize" }}>{val.name}</Typography>} secondary={val.email} />
                </ListItem>
                <p className="pl-15">{val.body}</p>
                <Divider>⌄</Divider>
            </div>
            )
        )}
    </List>
  );
}