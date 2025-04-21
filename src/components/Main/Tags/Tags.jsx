import React, { useState } from 'react';
import styles from './Tags.module.css';
import useTags from "../../../hooks/useTags.js";

const Tags = () => {
  const { tags, loading, error } = useTags();
  const [selectedTags, setSelectedTags] = useState([]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  return (
    <section className={styles.containerTags}>
      <h3 className={styles.tagsTitle}>Lorem ipsum dolor sit amet consectetur</h3>
      <div className={styles.tagsWrapper}>
        {tags.map((tag, index) => (
          <span
            key={index}
            className={selectedTags.includes(tag) ? styles.selected : ''}
            onClick={() => handleTagClick(tag)}
            aria-pressed={selectedTags.includes(tag)} // Indica se a tag está selecionada
            aria-label={`Selecione a tag ${tag}`} // Fornece uma descrição do comportamento da tag
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Tags;
