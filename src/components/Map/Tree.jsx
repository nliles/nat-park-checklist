import styles from './Map.module.scss'

const Tree = ({ isSelected }) => {
  const fill = isSelected ? "#4b5e26" : "#A8C686";
  return (
    <svg stroke="#4b5e26" strokeWidth="35" width="35px" height="35px" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
      <path fill={fill} d="m557.57 1057-395.15 2.4258 436.36-1059.4 438.79 1059.4-395.15-2.4258v143.03h-84.852z" fillRule="evenodd"/>
    </svg>
  )
}

export default Tree
