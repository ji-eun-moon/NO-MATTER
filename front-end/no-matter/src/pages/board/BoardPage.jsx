import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../config/axios'
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
  const [filteredRemotes, setFilteredRemotes] = useState([]);

  const getRemotes = () => {
    // json-server 테스트용
    axiosInstance({
      method: 'GET',
      url: 'http://172.18.0.3:3001/boards'
    })
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
    if (searchQuery === '') {
      setFilteredRemotes(remotes);
    } else {
      const filteredResults = remotes.filter(remote =>
        remote.remoteCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRemotes(filteredResults);
      setCurrentPage(1);
    }
  }, [searchQuery, remotes]);

  useEffect(() => {
    getRemotes();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  }

  const sortedRemotes = [...filteredRemotes].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.id - a.id;
    } else if (sortBy === 'downloads') {
      return b.download - a.download;
    } else if (sortBy === 'name') {
      return a.remoteCode.localeCompare(b.remoteCode);
    }
    return 0;
  });

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 8; // 페이지당 게시글 수
  const totalPages = Math.ceil(sortedRemotes.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsForCurrentPage = sortedRemotes.slice(startIndex, endIndex);
  
  const handleChangePage = (event, newPage) => {
    if (newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
            style={{ width: "100%", padding:"0px"}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton style={{ padding:"0px"}}>
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
              <th scope="col" className="text-center">Product Code</th>
              <th scope="col" className="text-center">Downloads</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center">Loading...</td>
              </tr>
            ) :  postsForCurrentPage.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">다운로드 가능한 리모컨이 없습니다.</td>
              </tr>
            ) : (
              postsForCurrentPage.map((remote, index) => (
                <tr key={remote.id}>
                  <td className="text-center">{startIndex + index + 1}</td>
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
          {/* <Pagination 
            count={totalPages} page={currentPage}
            onChange={(event, page) => setCurrentPage(page)} /> */}
            <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            size='midium'
            siblingCount={0}
          />
        </Stack>
      </div>
      </div>

  );
}

export default BoardPage;
