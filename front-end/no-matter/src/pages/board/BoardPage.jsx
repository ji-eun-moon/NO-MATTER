import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axios'
import GoBack from '../../components/GoBack.jsx';
import { MenuItem, FormControl, Select, TextField, InputAdornment, IconButton, Pagination, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom'; // 이 부분을 추가하세요.

// import swal from 'sweetalert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 5,
  px: 4,
  pb: 3,
};

function BoardPage() {
  const [remotes, setRemotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRemotes, setFilteredRemotes] = useState([]);
  const [wantDown, setWantDown] = useState(true)
  const [open, setOpen] = React.useState(false);
  const [rmtName, setRmtName] = useState('')
  const [curRmt, setCurRmt] = useState([])

  const location = useLocation();
  const hubId = location.state;
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setWantDown(false)
  };

  const getRemotes = () => {
    // json-server 테스트용
    axiosInstance({
      method: 'GET',
      url: 'board/list',
    })
      .then((response) => {
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

  const onRmtNameChange = (e) => {
    setRmtName(e.target.value)
  }

  const onClickBoard = (remote) => {
    console.log(remote)
    setCurRmt(remote)
    setOpen(true)
    setWantDown(true)
  }
  
  const onDownload = () => {
    console.log('체크', hubId, curRmt.boardId, rmtName)
    axiosInstance({
      method: 'POST',
      url: '/remote/download',
      data: {
      hubId : hubId,
      boardId : curRmt.boardId,
      controllerName : rmtName
      }
    })
      .then((response) => {
        setRemotes(response.data); // 리모컨 리스트
        setLoading(false);
        navigate(`/hubs/${hubId}`)
        setOpen(false)
      })
      .catch((error) => {
        if(error.response.data === 'DOWNLOAD_DUCPLICATED Code Duplicated'){
          alert('이미 등록된 리모컨입니다')
        }
        else if(error.response.data === 'REMOTE_NAME_DUPLICATED Name Duplicated'){
          alert('이미 등록된 이름입니다')
        }
      });
  }

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
                  <tr key={index} onClick={() => {onClickBoard(remote)}}>
                    <td className="text-center">{startIndex + index + 1}</td>
                    <td className="text-center">{remote.remoteCode}</td>
                    <td className="text-center">{remote.download}</td>
                  </tr>
              ))
            )}
          </tbody>
        </table>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 300, position: "relative" }} style={{ borderRadius: "10px" }}>
            <i className="bi bi-x-lg" onClick={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}></i>
            <br />
            <div className='d-flex align-items-center'>
              <div>
                <span>등록할 리모컨 이름을 입력해주세요(5자 이하)</span><br />
              </div>
            </div>
            <br />
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-basic"
                label="리모컨 이름"
                variant="filled" sx={{ '& .MuiFilledInput-input': { backgroundColor: 'white' } }}
                value={rmtName}
                onChange={onRmtNameChange}
                required
                autoFocus
              />
              
              <Button onClick={onDownload}>Download</Button>
            </Box>
          </Box>
        </Modal>    
      </div>

      <div className='centered'>
        <Stack spacing={2}>
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
