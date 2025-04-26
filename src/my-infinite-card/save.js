import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { cards } = attributes;

  return (
    <div {...useBlockProps.save({ className: 'card-list-wrapper' })}>
      <div className="card-list">
        {cards
          .filter((card) => card.imageUrl || (card.description && card.description.trim() !== ''))
          .map((card, index) => (
            <div key={index} className="card-item">
              {card.imageUrl && <img src={card.imageUrl} alt="" />}
              {card.description && (
                <RichText.Content tagName="p" value={card.description} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
