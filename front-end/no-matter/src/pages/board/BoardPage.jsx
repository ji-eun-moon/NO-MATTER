import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoBack from '../../components/GoBack.jsx';
import { InputLabel, MenuItem, FormControl, Select, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function BoardPage() {
  const [remotes, setRemotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const getRemotes = () => {
    // json-server 테스트용
    axios.get('http://localhost:3001/boards')
      .then((response) => {
        // console.log(response.data);
        setRemotes(response.data); // 리모컨 리스트
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching remotes:", error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getRemotes();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  }

  const sortedRemotes = [...remotes].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.id - a.id;
    } else if (sortBy === 'downloads') {
      return b.download - a.download;
    } else if (sortBy === 'name') {
      return a.remoteCode.localeCompare(b.remoteCode);
    }
    return 0;
  });

  return (
    <div className='container page-container'>
      <div className='d-flex justify-content-between mt-5'>
        <div className='d-flex'>
          <GoBack />
          <h1 className="font-700">Board</h1>
        </div>
      </div>
      <hr />


      <div className='d-flex'>
        <div className='me-1'>
        <TextField
            label="리모컨 검색"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            style={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="d-flex justify-content-end mb-3">
          <FormControl sx={{ minWidth: 120 }} size="small">
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="recent">최신순</MenuItem>
              <MenuItem value="downloads">다운로드 순</MenuItem>
              <MenuItem value="name">이름 순</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="table-responsive" style={{borderRadius:"10px"}}>
        <table className="table" >
          <thead className='table-light'>
            <tr>
              <th scope="col" className="text-center">No</th>
              <th scope="col" className="text-center">Code</th>
              <th scope="col" className="text-center">Downloads</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3}>Loading...</td>
              </tr>
            ) : sortedRemotes.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">다운로드 가능한 리모컨이 없습니다.</td>
              </tr>
            ) : (
              sortedRemotes.map((remote, index) => (
                <tr key={remote.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{remote.remoteCode}</td>
                  <td className="text-center">{remote.download}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className='centered'>
        <Stack spacing={2}>
          <Pagination count={5} />
        </Stack>
      </div>
      </div>

  );
}

export default BoardPage;
