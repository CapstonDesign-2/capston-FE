  import React, { useState, useRef, useEffect } from 'react';
  import styled from 'styled-components';
  import { Search, X } from 'lucide-react';
  
  export interface SearchItem {
    id: string;
    name: string;
    type: 'CPU' | 'GPU' | 'RAM';
  }
  
  const SearchContainer = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    position: relative;
  `;
  
  const SearchWrapper = styled.div<{ isExpanded: boolean }>`
    border: 1px solid ${props => props.isExpanded ? '#666' : '#EAEAEA'};
    border-radius: ${props => props.isExpanded ? '8px 8px 0 0' : '8px'};
    background-color: white;
    transition: all 0.2s ease;
  `;
  
  const SearchInput = styled.div`
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: white;
    cursor: text;
  `;
  
  const Input = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    background: transparent;
    color: #333;
  
    &::placeholder {
      color: #999;
    }
  `;
  
  const Button = styled.button`
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
  
    &:hover {
      color: #333;
    }
  `;
  
  const DropdownList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #666;
    border-top: none;
    border-radius: 0 0 8px 8px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
  `;
  
  const DropdownItem = styled.div`
    padding: 0.75rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  
    &:hover {
      background-color: #F5F5F5;
    }
  `;
  
  const TypeBadge = styled.span<{ type: 'CPU' | 'GPU' | 'RAM' }>`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: ${props => {
      switch (props.type) {
        case 'CPU': return '#E3F2FD';
        case 'GPU': return '#FCE4EC';
        case 'RAM': return '#E8F5E9';
        default: return '#F5F5F5';
      }
    }};
    color: ${props => {
      switch (props.type) {
        case 'CPU': return '#1976D2';
        case 'GPU': return '#C2185B';
        case 'RAM': return '#388E3C';
        default: return '#666';
      }
    }};
  `;
  
  const NoResults = styled.div`
    padding: 1rem;
    text-align: center;
    color: #666;
  `;
  
  // 샘플 데이터
  const sampleData: SearchItem[] = [
    { id: '1', name: 'Intel Core i7-12700K', type: 'CPU' },
    { id: '2', name: 'AMD Ryzen 9 5950X', type: 'CPU' },
    { id: '3', name: 'NVIDIA RTX 3080', type: 'GPU' },
    { id: '4', name: 'AMD Radeon RX 6800', type: 'GPU' },
    { id: '5', name: 'Samsung DDR4-3200', type: 'RAM' },
    { id: '6', name: 'Crucial Ballistix RGB', type: 'RAM' },
  ];
  
  const SearchBar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsExpanded(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    useEffect(() => {
      if (searchTerm) {
        const filtered = sampleData.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
      } else {
        setFilteredItems([]);
      }
    }, [searchTerm]);
  
    const handleInputClick = () => {
      setIsExpanded(true);
    };
  
    const handleItemClick = (item: SearchItem) => {
      setSearchTerm(item.name);
      setIsExpanded(false);
      // 여기에 검색 실행 로직 추가
    };
  
    const handleClear = () => {
      setSearchTerm('');
      setIsExpanded(true);
    };
  
    return (
      <SearchContainer ref={containerRef}>
        <SearchWrapper isExpanded={isExpanded}>
          <SearchInput onClick={handleInputClick}>
            <Search size={20} color="#666" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsExpanded(true)}
            />
            {searchTerm && (
              <Button onClick={handleClear}>
                <X size={20} />
              </Button>
            )}
          </SearchInput>
        </SearchWrapper>
  
        {isExpanded && (searchTerm || filteredItems.length > 0) && (
          <DropdownList>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <DropdownItem key={item.id} onClick={() => handleItemClick(item)}>
                  <TypeBadge type={item.type}>{item.type}</TypeBadge>
                  {item.name}
                </DropdownItem>
              ))
            ) : (
              <NoResults>No results found</NoResults>
            )}
          </DropdownList>
        )}
      </SearchContainer>
    );
  };
  
  export default SearchBar;