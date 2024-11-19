import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Header from '../components/Header';
import HardwareFilter, { HardwareType } from '../components/HardwareFilter';
import { Container, RankingItem, Rank, Name, ScoreWrapper, ScoreItem, StyledList } from '../style/HardwarePerformance';
import axiosInstance from '../utils/axiosConfig';
import LoadingOverlay from '../components/LoadingOverlay';

interface HardwareItem {
  cpuId?: number;
  gpuId?: number;
  ramId?: number;
  cpuName?: string;
  gpuName?: string;
  ramName?: string;
  cpuScore?: number;
  gpuScore?: number;
  ramScore?: number;
  cpuPrice?: number;
  gpuPrice?: number;
  ramPrice?: number;
}

const ITEMS_PER_PAGE = 500; // 한 번에 로드할 아이템 수
const WINDOW_HEIGHT = 800; // 창 높이
const ITEM_HEIGHT = 70; // 각 아이템의 높이

const HardwarePerformance: React.FC = () => {
  const [selectedType, setSelectedType] = useState<HardwareType>('cpu');
  const [hardwareData, setHardwareData] = useState<HardwareItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreItems = async (startIndex: number, stopIndex: number) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/api/${selectedType}`, {
        params: {
          page,
          limit: ITEMS_PER_PAGE
        }
      });
      
      const newData = response.data;
      setHardwareData(prev => [...prev, ...newData]);
      setHasNextPage(newData.length === ITEMS_PER_PAGE);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching hardware performance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 하드웨어 타입이 변경될 때 데이터 초기화
    setHardwareData([]);
    setPage(1);
    setHasNextPage(true);
    loadMoreItems(0, ITEMS_PER_PAGE);
  }, [selectedType]);

  const isItemLoaded = (index: number) => !hasNextPage || index < hardwareData.length;

  const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style}>
          <RankingItem>
            <LoadingOverlay />
          </RankingItem>
        </div>
      );
    }

    const item = hardwareData[index];
    let name, score, price;

    switch(selectedType) {
      case 'cpu':
        name = item.cpuName;
        score = item.cpuScore;
        price = item.cpuPrice || 'N/A';
        break;
      case 'gpu':
        name = item.gpuName;
        score = item.gpuScore;
        price = item.gpuPrice || 'N/A';
        break;
      case 'ram':
        name = item.ramName;
        score = item.ramScore;
        price = item.ramPrice || 'N/A';
        break;
    }

    return (
      <div style={style}>
        <RankingItem>
          <Rank>{index + 1}</Rank>
          <Name>{name}</Name>
          <ScoreWrapper>
            <ScoreItem>성능점수: {score?.toLocaleString() || 'N/A'}점</ScoreItem>
            <ScoreItem>가격: {typeof price === 'number' ? `${price.toLocaleString()}$` : price}</ScoreItem>
          </ScoreWrapper>
        </RankingItem>
      </div>
    );
  };

  return (
    <>
      <Header />
      <Container>
        <HardwareFilter
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />
        
        {isLoading && hardwareData.length === 0 ? (
          <LoadingOverlay />
        ) : (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={hasNextPage ? hardwareData.length + 1 : hardwareData.length}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <StyledList
                height={WINDOW_HEIGHT}
                itemCount={hardwareData.length + 1}
                itemSize={ITEM_HEIGHT}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width="100%"
              >
                {renderRow}
              </StyledList>
            )}
          </InfiniteLoader>
        )}
      </Container>
    </>
  );
};

export default HardwarePerformance;