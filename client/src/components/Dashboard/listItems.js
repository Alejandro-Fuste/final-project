import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import WorkIcon from '@material-ui/icons/Work';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LayersIcon from '@material-ui/icons/Layers';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SettingsIcon from '@material-ui/icons/Settings';

import { Link } from "react-router-dom";

export default function MainListItems() {
   return  (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon style={{color: '#A5A4BF'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <Link style={{ color: '#fff', textDecoration: 'none'}} to='/search'>
                    <ListItem button>
                        <ListItemIcon>
                            <SearchIcon style={{color: '#A5A4BF'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Search"/>
                    </ListItem>
                </Link>
                <Link style={{ color: '#fff', textDecoration: 'none'}} to='/portfolio'>
                    <ListItem button>
                        <ListItemIcon>
                            <WorkIcon style={{color: '#A5A4BF'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Portfolio"/>
                    </ListItem>
                </Link>
                <Link style={{ color: '#fff', textDecoration: 'none'}} to='/watchlist'>
                    <ListItem button>
                        <ListItemIcon>
                            <VisibilityIcon style={{color: '#A5A4BF'}}/>
                        </ListItemIcon>
                        <ListItemText primary="Watchlist"/>
                    </ListItem>
                </Link>
                <ListItem button>
                    <ListItemIcon>
                        <LayersIcon style={{color: '#A5A4BF'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Options"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AttachMoneyIcon style={{color: '#A5A4BF'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Financials"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon style={{color: '#A5A4BF'}}/>
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItem>
            </div>
    );

}