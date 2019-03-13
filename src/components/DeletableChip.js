export const DeletableChip = () => {
  return (
    <Chip
      avatar={
        <Avatar>
          <FaceIcon />
        </Avatar>
        }
      label='Deletable Secondary Chip'
      onDelete={handleDelete}
      className={classes.chip}
      color='secondary'
      />
  )
}
