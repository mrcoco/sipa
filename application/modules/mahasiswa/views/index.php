<h1>Halaman Mahasiswa</h1>

<a href="<?php echo site_url('mahasiswa/showFormAddMahasiswa');?>">Tambah Mahasiswa</a>

<ul>
<?php foreach ($list_mahasiswa as $mahasiswa) : ?>
	<li>
		<div id="item_mahasiswa">
			<h3><?php echo $mahasiswa->nama ?></h3>
			<a href="<?php echo site_url('mahasiswa/showFormUpdatemahasiswa/'.$mahasiswa->id_mahasiswa);?>">Edit</a> | 
			<a href="<?php echo site_url('mahasiswa/deletemahasiswa/'.$mahasiswa->id_mahasiswa);?>">Delete</a> <br><br>
			nip : <?php echo $mahasiswa->nim ?> <br>
			alamat : <?php echo $mahasiswa->alamat ?> <br>
		</div>
	</li>
<?php endforeach;?>
</ul>
