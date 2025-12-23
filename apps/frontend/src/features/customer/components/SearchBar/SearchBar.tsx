import styled from 'styled-components'
import searchIcon from '/search.svg'
import { useState, useEffect } from 'react'
import { Input } from '@shared/style'

const SearchContainer = styled.div`
  position: relative;
  width: 250px;
`

const SearchIcon = styled.img`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

type SearchBarProps = {
  searchName: string
  onSearchNameChange: (name: string) => void
}

export function SearchBar({ searchName, onSearchNameChange }: SearchBarProps) {
  const [localSearchValue, setLocalSearchValue] = useState<string>(searchName)

  useEffect(() => {
    setLocalSearchValue(searchName)
  }, [searchName])

  const handleSearch = () => {
    onSearchNameChange(localSearchValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="고객 이름으로 검색하세요"
        value={localSearchValue}
        onChange={(e) => setLocalSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon src={searchIcon} alt="검색" onClick={handleSearch} />
    </SearchContainer>
  )
}
