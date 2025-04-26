import { useBlockProps, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button, IconButton } from '@wordpress/components';
import { close } from '@wordpress/icons';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const { cards } = attributes;

  const addCard = () => {
    const newCards = [...cards, { imageUrl: '', description: '' }];
    setAttributes({ cards: newCards });

    // Fokuskan scroll ke card baru
    setTimeout(() => {
      const newCardElement = document.querySelector('.card-item:last-child');
      if (newCardElement) {
        newCardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100); // Delay sedikit agar card sudah ditambahkan saat melakukan scroll
  };

  const removeCard = (indexToRemove) => {
    const newCards = cards.filter((_, index) => index !== indexToRemove);
    setAttributes({ cards: newCards });
  };

  const onSelectImage = (media, index) => {
    const newCards = [...cards];
    newCards[index].imageUrl = media.url;
    setAttributes({ cards: newCards });
  };

  const onChangeDescription = (value, index) => {
    const newCards = [...cards];
    newCards[index].description = value;
    setAttributes({ cards: newCards });
  };

  return (
    <div {...useBlockProps({ className: 'card-scroll-wrapper' })}>
      <div className="card-list">
        {cards.map((card, index) => (
          <div key={index} className="card-item">
            <div className="remove-button">
              <IconButton
                icon={close}
                label="Hapus Card"
                onClick={() => removeCard(index)}
              />
            </div>

            <div className="image-container">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(media) => onSelectImage(media, index)}
                  allowedTypes={['image']}
                  render={({ open }) => (
                    <div className="upload-box" onClick={open}>
                      {card.imageUrl ? (
                        <img src={card.imageUrl} alt="" />
                      ) : (
                        <div className="placeholder">➕</div>
                      )}
                    </div>
                  )}
                />
              </MediaUploadCheck>
            </div>

            <RichText
              tagName="p"
              placeholder="Tulis deskripsi gambar..."
              value={card.description}
              onChange={(value) => onChangeDescription(value, index)}
            />
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        onClick={addCard}
        className="add-card-button"
      >
        ➕ Tambah Card
      </Button>
    </div>
  );
}
